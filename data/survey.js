export const surveyData = [
  {
    category: 'Technical cyber security',
    questions: [
      {
        id: 1,
        question:
          'Selection and use of malware detection software on all devices',
        description: `Centrally select and install malware detection and repair programs and update them regularly for preventive or regular scanning of computers and media.

Programs should check at least the following:

- Files received over the network or storage media are scanned for malware before use
- Email attachments and downloaded files are scanned for malware before use
- Websites are scanned for malware`,
        priority: 1,
      },
      {
        id: 2,
        question:
          'Documentation of system logs for self-maintained data systems',
        description: `The development of system logs must keep pace with the development of the system and enable, for example, the necessary resolution of incidents. In connection with the data system list, we describe for which systems we are responsible for the implementation of the logging. For these systems, we document:

- Which data is saved on the log
- How long log data is retained`,
        priority: 2,
      },
      {
        id: 3,
        question:
          'Documenting and delegating ownership of own backup processes',
        description: `In connection with the data systems listing, we describe for which systems we are responsible for the implementation of the backup. The organization’s own backup processes are documented and an owner is assigned to each. The documentation includes e.g.:

- Which system is used for backing up data?
- How are the backups protected (encryption, physical location)?
- How long are the backups retained?`,
        priority: 2,
      },
      {
        id: 4,
        question: 'Encryption of backup data',
        description: `When the confidentiality of backups is important, backups are protected by encryption. The need to encrypt backups may become highlighted when backups are stored in a physical location where security policies are unknown.`,
        priority: 2,
      },
      {
        id: 5,
        question: 'Encryption of laptops',
        description: `Laptops are protected by full-disk encryption.`,
        priority: 2,
      },
      {
        id: 6,
        question:
          'Regular testing, evaluation, and recovery instructions for backups',
        description: `The media used for backups and the restoration of backups are tested regularly to ensure that they can be relied on in an emergency.

Accurate and complete instructions are maintained for restoring backups. The policy is used to monitor the operation of backups and to prepare for backup failures.`,
        priority: 2,
      },
      {
        id: 7,
        question: 'Clock synchronization',
        description: `Synchronizing clocks between different systems allows for good interoperability, as well as easier tracking of problem situations and perception of event flows.

An organization must use a reliable source to adjust and synchronize time, at least for systems that are critical to its operations. When suitable organization should use two sources.`,
        priority: 3,
      },
      {
        id: 8,
        question:
          'Compliance of used cryptographic controls in relation to applicable requirements',
        description: `Organisation should verify that the set of cryptographic controls that apply to the use of data systems comply with relevant agreements, legislation and regulations.`,
        priority: 3,
      },
      {
        id: 9,
        question: 'Configuration management and change log',
        description: `Current configurations of devices, data systems and networks are documented and a log is maintained of configuration changes.

Changes to configurations must be controlled and go through the change management procedure. Only authorized personnel are allowed to make changes to the configurations.

Configuration information may include e.g.:

- Property owner and contact point information
- Date of last configuration change
- Configuration model version
- Connections to other assets`,
        priority: 3,
      },
      {
        id: 10,
        question: 'Data system log review',
        description: `The organization must be aware of the logs that accrue from the use of different data systems, whether generating the logs is the responsibility of the organization or the system provider. Logs record user actions as well as anomalies, errors, and security incidents.

The adequacy of log should be reviewed regularly. If necessary, log should be usable to determine the root causes for system incidents.`,
        priority: 3,
      },
      {
        id: 11,
        question: 'Defining standard templates for secure configurations',
        description: `Organization must be able to monitor that devices, data systems and networks are maintained in accordance with the defined configurations (including security features) both during the implementation phase and throughout their entire life cycle.

For this, the organization has defined standard templates for secure configurations of devices, data systems and networks. When specifying standard templates, the following are taken into account:

- Publicly available guidelines (e.g. templates from suppliers and independent security organizations)
- The level of protection required for different assets
- Fulfilling related information security requirements
- Feasibility and applicability of the configurations to the organization's operations

Standard templates should be checked regularly and updated when significant new threats or vulnerabilities need to be responded to or new software or hardware versions are released.

The following points should be taken into account when defining standard templates:

- The number of root-level rights is minimized
- Unnecessary access rights are disabled
- Unnecessary functions and services are deactivated
- Access to powerful utilities and important settings is strictly controlled
- The clocks are synchronized
- The supplier's default passwords are changed immediately and the security-related settings are checked
- Timeout functions are used if necessary (e.g. automatic logout)
- License requirements are met`,
        priority: 3,
      },
      {
        id: 12,
        question: 'Definition and monitoring of alarm policies',
        description: `Often, security tools provide a way to set alert policies when something potentially dangerous happens in an organization's environment. For example, Microsoft 365 has built-in alert policies to alert you to abuse of administrator privileges, malware, potential internal and external risks, and data security risks.

The organization must identify security-related events in data systems and the environments in which they operate. To respond to changes related to these events, alarm policies must be created.

Alarm policies need to be actively monitored and modified based on experience.`,
        priority: 3,
      },
      {
        id: 13,
        question: 'Deployment and regular analysis of security system logs',
        description: `Security systems (e.g. firewall, malware protection) often have the ability to record a log of events. At regular intervals, make sure that a comprehensive log is accumulated and try to identify suspicious activity. The log is also useful in investigating disturbances or violations.`,
        priority: 3,
      },
      {
        id: 14,
        question: 'Detecting and blocking access to dangerous websites',
        description: `The organization must identify the types of websites that staff should and should not have access to.

The organization must consider blocking access to the following types of sites (either automatically or by other means):

- Websites with a file upload function, unless this is permitted for a specific business need
- Known or suspected malicious websites (e.g. distributing malware or containing phishing content)
- Command and control servers
- Websites distributing illegal content`,
        priority: 3,
      },
      {
        id: 15,
        question:
          'Determining responsibilities for backing up important information assets',
        description: `With adequate backups, all important data and programs can be restored after a disaster or media failure. An important first step in a functional backup strategy is to identify who is responsible for backing up each piece of data. Determining the responsibility for backup is the responsibility of the owners of the information assets (systems, hardware).

If the backup is the responsibility of the partner, we will find out:

- How comprehensively does the partner back up the data?
- How the data can be recovered if necessary?
- How the backups are agreed in the contracts?

If the backup is our own responsibility, we will find out:

- Whether the data backup process exists and is documented?
- Whether the coverage and implementation cycle of the backup is at the level required by the importance of the data?`,
        priority: 3,
      },
      {
        id: 16,
        question:
          'Determining the baseline for network and data system usage for monitoring purposes',
        description: `Organization must describe the baseline of normal behaviour for the use of network and data systems, which is used as a starting point for identifying anomalies.

When defining the baseline, the following must be taken into account:

- Monitoring the use of data systems during both normal and peak times
- Usual times of use, places of use and frequency of use for each user and user group

Monitoring systems must be configured against the baseline to identify anomalous behavior such as:

- Unplanned termination of systems or processes
- Traffic related to malware or malicious IP addresses or domains
- Known attack characteristics (e.g. denial of service or buffer overflow)
- Unusual system use (e.g. keystroke logging)
- Bottlenecks and overloads (e.g. network queues, latency levels)
- Unauthorized access (actual or attempted) to systems or data
- Unauthorized scanning of data systems and networks
- Successful and failed attempts to access protected resources (e.g. DNS servers, web portals and file systems)
- Unusual user and system behavior`,
        priority: 3,
      },
      {
        id: 17,
        question: 'Determining the responsibility of network devices',
        description: `Owners have been assigned to various network devices, who are responsible for ensuring that the information processed on the networks and related services are protected from unauthorized access. Where appropriate, liability for network equipment must be separated from other related responsibilities.`,
        priority: 3,
      },
      {
        id: 18,
        question: 'Encryption of portable media',
        description: `Storing confidential information on removable media should be avoided. When removable media is used to transfer confidential information, appropriate security is used (e.g., full disk encryption with pre-boot authentication).`,
        priority: 3,
      },
      {
        id: 19,
        question: 'General, risk-based encryption policy',
        description: `Deciding on the need for encryption solutions is seen as part of an overall process that includes risk assessment and the definition of other management tasks.

The organization has established a general encryption policy that is always followed when protecting information using encryption.

Encryption policy defines:

- General principles for using cryptographic controls throughout the organization
- Methods for determining the needed level of encryption on the basis of a asset risk assessment
- The use of encryption on mobile devices
- Ways to protect encryption keys and recover encrypted data when keys are lost
- Roles and responsibilities related to encryption
- The effects of encryption on other tasks of the security management system`,
        priority: 3,
      },
      {
        id: 20,
        question: 'Network areas and structurally secure network design',
        description: `An owner is defined for an organization's networks. The owner is responsible for planning the structure of the network and documenting it.

Separate network areas are used in network design as needed. Domain areas can be defined by e.g.:

- trust level (e.g. public, workstations, server)
- organizational units (e.g. HR, financial management)
- or by some combination (e.g. a server domain connected to multiple organizational units)

Separation can be implemented either with physically separate networks or with logically separate networks.`,
        priority: 3,
      },
      {
        id: 21,
        question:
          'Network usage log and process for detecting inappropriate network traffic',
        description: `An appropriate log is generated from the use of the network to enable the detection of actions relevant to cyber security.

The normal state of network traffic (traffic volumes, protocols, and connections) is known. In order to detect anomalies, there is a procedure for detecting events that are different from the normal state of network traffic (e.g., anomalous connections or their attempts).`,
        priority: 3,
      },
      {
        id: 22,
        question: 'Preparing for quick data recovery after faults',
        description: `Restorability refers to how quickly personal data are restored to be available and accessible in the event of a physical or technical failure.`,
        priority: 3,
      },
      {
        id: 23,
        question:
          'Procedures and data sources for gathering reliable information about malware',
        description: `The organization has defined policies that regularly collect up-to-date and reliable information about malware. Such can include mailing lists, magazines, blogs from security vendors, or security news sites.

These sources help verify malware information, distinguish scams from real threats, and ensure that warnings are accurate.`,
        priority: 3,
      },
      {
        id: 24,
        question: 'Protecting log information',
        description: `The logs are protected from unauthorized changes and from malfunctions such as:

- Changes to the message types that can be saved
- Editing or deleting log information
- Exceeding log storage capacity (which may cause overwrites or missed entries)`,
        priority: 3,
      },
      {
        id: 25,
        question: 'Protection of wireless connections',
        description: `The use of the wireless network is secured with sufficient keys and the traffic is encrypted. A guest wireless network is isolated from the internal network.`,
        priority: 3,
      },
      {
        id: 26,
        question:
          'Regular malware inspection of data systems supporting critical business processes',
        description: `Critical data systems are regularly inspected to identify malware. All unauthorized files or changes are formally investigated.`,
        priority: 3,
      },
      {
        id: 27,
        question: 'Access management for files stored in the cloud',
        description: `By monitoring information shared via cloud services, risks of unauthorized disclosure can be managed. For example:

- Which employees share the most?
- How often do DLP policies alert or get ignored?
- Is important info stored beyond DLP control?`,
        priority: 4,
      },
      {
        id: 28,
        question: 'Automatic blocking and detecting of unauthorized software',
        description: `Policies exist to prevent or detect use of unauthorized programs.`,
        priority: 4,
      },
      {
        id: 29,
        question: 'Automatic log data analyzation',
        description: `System logs are reviewed with tools to identify events relevant to security. Consider automatic extraction of key message types or using audit tools.`,
        priority: 4,
      },
      {
        id: 30,
        question: 'Defining a backup strategy',
        description: `The backup strategy maps out:

- Systems we back up
- Data asset criticality and backup frequency
- Backup location and protection
- Retention periods
- Media destruction process`,
        priority: 4,
      },
      {
        id: 31,
        question:
          'Information sharing related to network and data systems usage anomalies',
        description: `Anomalies are reported to support:

- Auditing
- Security assessment
- Vulnerability identification and monitoring`,
        priority: 4,
      },
      {
        id: 32,
        question: 'Instructing and training staff regarding malware',
        description: `Staff are regularly trained on malware protection, incident reporting, and recovery procedures.`,
        priority: 4,
      },
      {
        id: 33,
        question: 'Monitoring configurations',
        description: `Configurations are monitored using management tools and reviewed for:

- Password strength
- Operation logs
- Deviations from target configuration

Unauthorized changes are corrected and investigated.`,
        priority: 4,
      },
      {
        id: 34,
        question:
          'Monitoring the use of the network and information systems to identify anomalies',
        description: `Systems and networks are monitored to detect anomalies. Monitoring tools must:

- Handle large data volumes
- Adapt to evolving threats
- Alert in real time

Monitoring sources can include traffic, system access, and logs.`,
        priority: 4,
      },
      {
        id: 35,
        question: 'Revision of encryption methods and assessment of adequacy',
        description: `Encryption methods are selected based on:

- Cost
- Type and strength of algorithm
- Value of assets

External expert advice is considered when defining practices.`,
        priority: 4,
      },
      {
        id: 36,
        question:
          'Vulnerability monitoring in used third-party or open source libraries',
        description: `Third-party/open source libraries are scanned and monitored for vulnerabilities. Policies define how updates are identified and handled.`,
        priority: 4,
      },
    ],
  },
];
