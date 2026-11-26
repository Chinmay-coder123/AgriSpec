# CERT-In Cyber Security Directions (2022): Mandatory Statutory Controls for Digital Systems

**Document Title:** Directions under sub-section (6) of Section 70B of the Information Technology Act, 2000 relating to information security practices, procedure, prevention, response and reporting of cyber incidents  
**Reference Number:** No. 20(3)/2022-CERT-In  
**Authority:** Indian Computer Emergency Response Team (CERT-In), Ministry of Electronics and Information Technology (MeitY), Government of India  
**Date of Issuance:** 28th April, 2022 (Effective from 60 days of publication)  
**Jurisdiction:** Republic of India  
**Document Nature:** Binding Statutory Directions issued under Section 70B(6) of the IT Act, 2000  

---

## 1. Scope and Applicability

These directions apply mandatorily to all service providers, intermediaries, data centres, body corporate, and digital application providers operating in India or handling systems/data of Indian users (including cloud-hosted AgriTech platforms, IoT data brokers, and mobile applications).

---

## 2. Mandatory Reporting of Cyber Incidents within 6 Hours (Direction 1)

* Any service provider, intermediary, data centre, or body corporate **must mandatorily report cyber security incidents to CERT-In within 6 (six) hours of noticing such incidents or being brought to notice**.
* **Reportable Incidents (Annexure I) relevant to digital platforms include:**
  1. Targeted scanning / probing of critical ICT infrastructure;
  2. Compromise of critical systems, servers, or cloud infrastructure;
  3. Unauthorised access of IT systems / data, including customer databases;
  4. Defacement of website, intrusion into website, or unauthorized changes;
  5. Malicious code attacks, including Ransomware attacks;
  6. Data Breaches or Data Leaks;
  7. Denial of Service (DoS) and Distributed Denial of Service (DDoS) attacks;
  8. Attacks on Application Programming Interfaces (APIs), authentication servers, or databases;
  9. Identity theft, spoofing, and phishing attacks;
  10. Attacks on Internet of Things (IoT) devices, gateways, and associated networks;
  11. Unauthorised access to cloud accounts, credentials, or storage buckets.

---

## 3. Mandatory Clock Synchronization via NTP (Direction 2)

* All service providers, intermediaries, and digital infrastructure operators **must mandatorily connect all ICT systems clocks to the Network Time Protocol (NTP) servers of National Informatics Centre (NIC) or National Physical Laboratory (NPL)**, or NTP servers traceable to these sources.
* **Purpose:** Ensures exact, legally admissible time-stamping for all system event logs, API request histories, database transactions, and forensic incident investigation across distributed architectures.

---

## 4. Mandatory Log Retention for 180 Consecutive Days within India (Direction 3)

* All service providers, intermediaries, and entities operating digital systems **must mandatorily enable logging across all ICT systems, applications, databases, security devices, APIs, and cloud services**.
* **Log Retention Period:** Logs must be maintained **securely for a rolling duration of 180 (one hundred and eighty) consecutive days**.
* **Jurisdiction Mandate:** The logs must be maintained within the Indian jurisdiction and must be readily provided to CERT-In upon notice or direction.
* **Log Contents to Capture:**
  * User access logs (authentication attempts, success, failure);
  * Application audit trails (record creation, modification, deletion, export);
  * API gateway request logs (caller IP, method, URI, status code, response time);
  * Database transaction logs and administrative privilege escalation events;
  * Firewall and system security alerts.

---

## 5. Maintenance of Customer Identity and Transaction Records for 5 Years (Direction 5)

* Virtual Private Network (VPN) providers, cloud service providers, and digital financial intermediaries must maintain validated customer identification records (Subscriber KYC, IP address assigned, timestamp, email, contact details) **for a minimum period of 5 (five) years** after the cancellation or withdrawal of registration.
* Financial transaction records related to user payments, DBT distribution, or digital subscriptions must be preserved for 5 years as required by the Prevention of Money Laundering Act (PMLA) and RBI frameworks.

---

## 6. Implementation Architecture for AgriTech Platforms

1. **Incident Response Runbook:** Platforms must maintain an automated incident alerting pipeline capable of triggering an incident report to `incident@cert-in.org.in` within 6 hours of automated breach detection.
2. **NTP Client Configuration:** All cloud servers, backend microservices, and edge IoT gateways must synchronize against `time.nic.in` or `time.nplindia.org`.
3. **Encrypted Log Storage:** Implement an immutable, write-once-read-many (WORM) log aggregation pipeline (e.g., append-only log store with SHA-256 integrity verification) retaining 180 days of activity.
