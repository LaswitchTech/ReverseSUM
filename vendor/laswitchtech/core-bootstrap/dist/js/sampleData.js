const sampleNow = new Date();
const sampleDate = sampleNow.toISOString().replace(/T/, ' ').replace(/\..+/, '');
const sampleLoremTitle = 'Lorem ipsum dolor sit amet';
const sampleLoremDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
const sampleLoremContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const sampleReferencesTypes = [
    {id:'ccn',text:'Cargo Control Number'},
    {id:'cn',text:'Container'},
    {id:'tr',text:'Transaction'},
    {id:'po',text:'Purchase Order'},
    {id:'inv',text:'Invoice'},
    {id:'other',text:'Other'},
];

const sampleReferences = {
    'ccn': ['1234ABCD123456789'],
    'cn': ['ABCD123456','ABCD123457'],
    'tr': ['12345123456789'],
    'po': ['ABCD'],
    'inv': ['INV-1234'],
};

const sampleMeta = [
    '1234ABCD123456789',
    'ABCD123456',
    'ABCD123457',
    '12345123456789',
    'ABCD',
    'INV-1234',
];

const sampleUnique = [
    '1234ABCD123456789',
    '12345123456789',
];

const sampleContacts = [
    'michael.smith@domain.com',
    'emma.johnson@domain.com',
    'john.doe@domain.com',
    'jane.doe@domain.com',
    'david.brown@domain.com',
];

var tmpUsers = [];
for(const [key, username] of Object.entries(sampleContacts)){
    var domain = username.split('@').pop();
    var name = username.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    var randomOwner = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    var randomUpdatedBy = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    tmpUsers.push({
        'id':key, 
        'created':sampleDate, 
        'modified':sampleDate, 
        'owner':randomOwner, 
        'updatedBy':randomUpdatedBy, 
        'username':username,
        'passwordSalt':null,
        'passwordHash':null,
        '2FASalt':null,
        '2FAHash':null,
        'last2FA':sampleDate,
        '2FAMethod':'["smtp"]',
        'bearerToken':null,
        'name':name,
        'address':null,
        'city':null,
        'state':null,
        'country':null,
        'zipcode':null,
        'phone':null,
        'mobile':null,
        'status':0,
        'database':'SQL',
        'server':'[]',
        'domain':domain,
        'sessionId':null,
        'attempts':0,
        'lastAttempt':null,
        'requests':1,
        'lastRequest':null,
        'isActive':1,
        'isVerified':1,
        'verifiedSalt':null,
        'verifiedHash':null,
        'verifiedOn':sampleDate,
        'verifiedUntil':sampleDate,
        'isBanned':0,
        'isDeleted':0,
        'isAPI':0,
        'isContactInfoDynamic':1,
    });
}
const sampleUsers = tmpUsers;

var tmpOrganizations = [];
var tmpOrganizationsUnique = new Set(); // Use a Set to store unique values
for(const [key, username] of Object.entries(sampleContacts)){
    var rootDomain = username.split('@').pop();
    
    // Check if the rootDomain is already in the set
    if (tmpOrganizationsUnique.has(rootDomain)) {
        continue; // Skip the iteration if it's a duplicate
    }
    
    // Add the rootDomain to the set
    tmpOrganizationsUnique.add(rootDomain);

    var domain = rootDomain.split('.')[0];
    var name = domain.replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    var randomOwner = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    var randomUpdatedBy = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    tmpOrganizations.push({
        'id':key, 
        'created':sampleDate, 
        'modified':sampleDate, 
        'owner':randomOwner, 
        'updatedBy':randomUpdatedBy, 
        'name':name,
        'sbnr/ein':null,
        'address':null,
        'city':null,
        'state':null,
        'country':null,
        'zipcode':null,
        'email':null,
        'fax':null,
        'phone':null,
        'tollfree':null,
        'website':null,
        'domain':rootDomain,
        'database':'SQL',
        'server':'[]',
        'isSubsidiary':0,
        'isDeleted':0,
        'isActive':1,
    });
}
const sampleOrganizations = tmpOrganizations;

const sampleVersions = [
    {name:'portal',label:'Portal',version:'4.5.0',color:'info',icon:'bootstrap'},
    {name:'bootstrap',label:'Bootstrap',version:'4.5.0',color:'indigo',icon:'bootstrap'},
    {name:'bs5-default',label:'Theme',version:'4.5.0',color:'indigo',icon:'bootstrap'},
    {name:'php-auth',label:'Auth',version:'4.5.0',color:'success',icon:'bootstrap'},
    {name:'php-cli',label:'CLI',version:'4.5.0',color:'primary',icon:'bootstrap'},
    {name:'php-configurator',label:'Configurator',version:'4.5.0',color:'warning',icon:'bootstrap'},
    {name:'php-csrf',label:'CSRF',version:'4.5.0',color:'success',icon:'bootstrap'},
    {name:'php-database',label:'Database',version:'4.5.0',color:'green',icon:'bootstrap'},
    {name:'php-imap',label:'IMAP',version:'4.5.0',color:'teal',icon:'bootstrap'},
    {name:'php-logger',label:'Logger',version:'4.5.0',color:'info',icon:'bootstrap'},
    {name:'php-net',label:'Net',version:'4.5.0',color:'success',icon:'bootstrap'},
    {name:'php-router',label:'Router',version:'4.5.0',color:'teal',icon:'bootstrap'},
    {name:'php-sms',label:'SMS',version:'4.5.0',color:'success',icon:'bootstrap'},
    {name:'php-smtp',label:'SMTP',version:'4.5.0',color:'success',icon:'bootstrap'},
    {name:'php-updater',label:'Updater',version:'4.5.0',color:'warning',icon:'bootstrap'},
];

var tmpFilesTickets = [];
for(const [key, file] of Object.entries(['manifest.pdf','billoflading.pdf','purchaseorder.pdf','commercialinvoice.pdf'])){
    var extension = file.split('.').pop();
    var randomOwner = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    var randomUpdatedBy = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    tmpFilesTickets.push({
        id:key, 
        created:sampleDate, 
        modified:sampleDate, 
        owner:randomOwner, 
        updatedBy:randomUpdatedBy, 
        name:file, 
        filename:file, 
        type:extension, 
        dirname:'/data/tickets/' + key + '/', 
        checksum:'4jd6bn944t3hr5n46879aw4ret69549', 
        file:null, 
        size:3864978, 
        encoding:'base64', 
        meta:'{}', 
        isAttachment:true,
    });
}
const sampleFilesTickets = tmpFilesTickets;

const sampleFiles = {
    default: [],
    tickets: sampleFilesTickets,
};

var tmpPostsTickets = [];
for (var id = 1; id <= 10; id++){
    var randomOwner = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    var randomUpdatedBy = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    tmpPostsTickets.push({
        id:id, 
        created:sampleDate, 
        modified:sampleDate, 
        owner:randomOwner, 
        updatedBy:randomUpdatedBy, 
        content:sampleLoremContent,
    });
}
const samplePostsTickets = tmpPostsTickets;

const samplePosts = {
    default: [],
    tickets: samplePostsTickets,
};

const sampleStatuses = {
    tickets: {
        1: {
            type:'tickets', 
            icon:'inbox',
            color:'info',
            label:'Open',
            level:1,
            description:'The ticket is new and is waiting to be assigned to an agent.',
        },
        2: {
            type:'tickets', 
            icon:'door-open',
            color:'primary',
            label:'Reopened',
            level:2,
            description:'The ticket has been reopened due to new information or a recurrence of the issue.',
        },
        3: {
            type:'tickets', 
            icon:'person-lines-fill',
            color:'primary',
            label:'Assigned',
            level:3,
            description:'The ticket has been assigned to an agent and is being reviewed.',
        },
        4: {
            type:'tickets', 
            icon:'hourglass-split',
            color:'warning',
            label:'In Progress',
            level:4,
            description:'The agent is currently addressing the ticket.',
        },
        5: {
            type:'tickets', 
            icon:'clock-history',
            color:'secondary',
            label:'Waiting for Customer',
            level:5,
            description:'The agent needs additional information from the customer to proceed.',
        },
        6: {
            type:'tickets', 
            icon:'arrow-up-circle',
            color:'danger',
            label:'Escalated',
            level:6,
            description:'The ticket has been escalated to senior staff or a specialized team.',
        },
        7: {
            type:'tickets', 
            icon:'check2-circle',
            color:'success',
            label:'Resolved',
            level:7,
            description:'The issue has been addressed and the ticket has been resolved.',
        },
        8: {
            type:'tickets', 
            icon:'door-closed',
            color:'dark',
            label:'Closed',
            level:8,
            description:'The ticket has been closed and is no longer active.',
        },
        9: {
            type:'tickets', 
            icon:'archive',
            color:'light',
            label:'Archived',
            level:9,
            description:'The ticket has been archived for record-keeping, and is no longer active or under consideration.',
        },
    },
};

const samplePriorities = {
    tickets: {
        1: {
            type:'tickets',
            label: 'Low',
            description: 'The issue is minor and does not affect functionality.',
            icon: 'arrow-down',
            color: 'secondary',
            level:1,
            alt:[
                "This issue is like a tiny pothole on a highway. Drivers might notice, but it won't slow down the traffic.",
                "This issue is like finding an extra stamp on your passport. Unusual, but not a showstopper.",
                "This issue is like a misplaced shipping label. Might raise an eyebrow, but it won't derail the shipment.",
                "This issue is like a delayed lunch break at the customs office. A bit annoying, but you'll manage.",
            ],
        },
        2: {
            type:'tickets',
            label: 'Medium',
            description: 'The issue has some impact on functionality but workarounds may be available.',
            icon: 'arrow-left-right',
            color: 'info',
            level:2,
            alt:[
                "This issue is like a traffic jam on a side street. It's causing some detours, but the main route is still open.",
                "This issue is like a misplaced customs form. A bit of a hassle, but we've got duplicates.",
                "This issue is like a missing pallet from the inventory. It's a puzzle, but we can find it or work around it.",
                "This issue is like a holiday rush at the courier office. Tense, but we've handled worse.",
            ],
        },
        3: {
            type:'tickets',
            label: 'High',
            description: 'The issue is causing significant disruption to services.',
            icon: 'arrow-up',
            color: 'warning',
            level:3,
            alt:[
                "This issue is like a roadblock on a main street. It's causing major rerouting and delays.",
                "This issue is like a power outage at the customs office. It's halting the flow, and we need to act fast.",
                "This issue is like a lost shipping container. It's a major problem affecting the entire supply chain.",
                "This issue is like a strike at the transport company. It's a crisis, and we need a contingency plan.",
            ],
        },
        4: {
            type:'tickets',
            label: 'Urgent',
            description: 'The issue needs immediate attention, usually because it is causing a stop to critical services.',
            icon: 'exclamation-diamond-fill',
            color: 'danger',
            level:4,
            alt:[
                "This issue is like a bridge collapse. We need all hands on deck to address this immediately!",
                "This issue is like a lockdown at customs. Nothing's moving until we address this situation.",
                "This issue is like a cargo ship run aground. It's a crisis that's halting everything in its wake.",
                "This issue is like a wildfire near the transport routes. We need to act fast or face serious consequences.",
            ],
        },
        5: {
            type:'tickets',
            label: 'Critical',
            description: 'The issue is severely impacting critical services and needs to be fixed immediately.',
            icon: 'exclamation-triangle-fill',
            color: 'dark',
            level:5,
            alt:[
                "This issue is like all the city's traffic lights failing at once. We're facing total gridlock until this is fixed.",
                "This issue is like a server failure at the global customs network. We're blind and need to fix it now!",
                "This issue is like an airplane stuck on the runway. It's holding up everything and needs immediate resolution.",
                "This issue is like a landslide blocking the main rail route. We need a mountain of effort to solve this!",
            ],
        },
    },
};

// List of Variables
// - %CATEGORY%
// - %SUBCATEGORY%
// - %ITEM%
// - %SUBJECT%
// - %REMOTEID%
// - %REMOTEPASSWORD%
// - %START%
// - %END%

const sampleOptions = {
    categories: {
        tickets: {
            default: {
                lockCategory: false, 
                lockSubCategory: false, 
                lockItem: false, 
                defaultPriority: 1, 
                defaultSubject: null,
                showKnowledgeBase:false, 
                showCalendar:false, 
                showSubject:true, 
                showDescription:true, 
                showPriority: true, 
                showRemoteAccess: false, 
                showDates: false, 
                showFiles:false, 
                showReferences:false, 
                showMeta:false, 
                showFeed:true, 
                showAccept:false, 
                showDecline:false, 
                showShare: true, 
                showClose: true, 
                showArchive: true,
            },
            ITRemoteAssistance: {
                lockCategory: false, 
                lockSubCategory: false, 
                lockItem: false, 
                defaultPriority: 2, 
                defaultSubject: '%SUBCATEGORY% - ID:%REMOTEID% Password:%REMOTEPASSWORD%', 
                showKnowledgeBase:false, 
                showCalendar:false, 
                showSubject:false, 
                showDescription:true, 
                showPriority: true, 
                showRemoteAccess: true, 
                showDates: false, 
                showFiles:true, 
                showReferences:false, 
                showMeta:false, 
                showFeed:true, 
                showAccept:false, 
                showDecline:false, 
                showShare: true, 
                showClose: true, 
                showArchive: true,
            },
            HRRequest: {
                lockCategory: true, 
                lockSubCategory: true, 
                lockItem: true, 
                defaultPriority: 1, 
                defaultSubject: '%ITEM% - From:%START% To:%END%', 
                showKnowledgeBase:false, 
                showCalendar:true, 
                showSubject:false, 
                showDescription:true, 
                showPriority: false, 
                showCalendar:true, 
                showRemoteAccess: false, 
                showDates: true, 
                showFiles:false, 
                showReferences:false, 
                showMeta:false, 
                showFeed:true, 
                showAccept:true, 
                showDecline:true, 
                showShare: true, 
                showClose: true, 
                showArchive: true,
            },
        },
    },
};

const sampleCategories = {
    'tickets': {
        'Accounting': {id:1,category:null,subcategory:null,type:'tickets',label: 'Accounting', description: 'Accounting related issues.', icon: 'currency-dollar', color: 'info', sub: {
            'Billing': {id:2,category:1,subcategory:null,type:'tickets',label: 'Billing', category: 'Accounting', description: 'Billing related issues',  icon: 'credit-card-2-front-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Claims': {id:3,category:1,subcategory:null,type:'tickets',label: 'Claims', category: 'Accounting', description: 'Claims related issues',  icon: 'shield-shaded', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
        'Consultations': {id:4,category:null,subcategory:null,type:'tickets',label: 'Consultations', description: 'Consultations related issues.', icon: 'people-fill', color: 'info', sub: {
            'Claims': {id:5,category:4,subcategory:null,type:'tickets',label: 'Claims', category: 'Consultations', description: 'Claims related issues',  icon: 'shield-shaded', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Auditing': {id:6,category:4,subcategory:null,type:'tickets',label: 'Auditing', category: 'Consultations', description: 'Auditing related issues.',  icon: 'file-earmark-text-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Appointment Scheduling': {id:7,category:4,subcategory:null,type:'tickets',label: 'Appointment Scheduling', category: 'Consultations', description: 'Manage and schedule appointments',  icon: 'calendar', color: 'primary', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Customer Service': {id:8,category:4,subcategory:null,type:'tickets',label: 'Customer Service', category: 'Consultations', description: 'Customer Service related issues.',  icon: 'people-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Appeal': {id:9,category:4,subcategory:null,type:'tickets',label: 'Appeal', category: 'Consultations', description: 'Manage appeal consultations',  icon: 'balance-scale', color: 'primary', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Ruling': {id:10,category:4,subcategory:null,type:'tickets',label: 'Ruling', category: 'Consultations', description: 'Manage ruling consultations',  icon: 'gavel', color: 'primary', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'CITT': {id:11,category:4,subcategory:null,type:'tickets',label: 'CITT', category: 'Consultations', description: 'CITT related consultations',  icon: 'building', color: 'primary', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
        'Customs': {id:12,category:null,subcategory:null,type:'tickets',label: 'Customs', description: 'Customs related issues.', icon: 'shield-shaded', color: 'info', sub: {
            'Customs Declarations': {id:13,category:12,subcategory:null,type:'tickets',label: 'Customs Declarations', category: 'Customs', description: 'Manage customs declarations',  icon: 'paperclip', color: 'success', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Customer Service': {id:14,category:12,subcategory:null,type:'tickets',label: 'Customer Service', category: 'Customs', description: 'Customer Service related issues.',  icon: 'people-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
        'Finance': {id:15,category:null,subcategory:null,type:'tickets',label: 'Finance', description: 'Finance related issues.', icon: 'currency-dollar', color: 'info', sub: {
            'Budgeting': {id:16,category:12,subcategory:null,type:'tickets',label: 'Budgeting', category: 'Finance', description: 'Financial planning and budgeting',  icon: 'wallet', color: 'danger', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
        'HR': {id:17,category:null,subcategory:null,type:'tickets',label: 'HR', description: 'Human Resources related issues.', icon: 'people-fill', color: 'info', sub: {
            'Payroll': {id:18,category:17,subcategory:null,type:'tickets',label: 'Payroll', category: 'HR', description: 'Payroll related issues.',  icon: 'file-earmark-text-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Benefits': {id:19,category:17,subcategory:null,type:'tickets',label: 'Benefits', category: 'HR', description: 'Benefits related issues.',  icon: 'file-earmark-text-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Compensation': {id:20,category:17,subcategory:null,type:'tickets',label: 'Compensation', category: 'HR', description: 'Compensation related issues.',  icon: 'file-earmark-text-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Employee Relations': {id:21,category:17,subcategory:null,type:'tickets',label: 'Employee Relations', category: 'HR', description: 'Employee Relations related issues.',  icon: 'file-earmark-text-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: '', sub: {
                'Training': {id:22,category:null,subcategory:21,type:'tickets',label: 'Training', category: 'HR', subCategory: 'Employee Relations', description: 'Training related issues.', icon: 'file-earmark-text-fill', color: 'info'},
                'Hiring': {id:23,category:null,subcategory:21,type:'tickets',label: 'Hiring', category: 'HR', subCategory: 'Employee Relations', description: 'Hiring related issues.', icon: 'file-earmark-text-fill', color: 'info'},
                'Recruiting': {id:24,category:null,subcategory:21,type:'tickets',label: 'Recruiting', category: 'HR', subCategory: 'Employee Relations', description: 'Recruiting related issues.', icon: 'file-earmark-text-fill', color: 'info'},
                'Termination': {id:25,category:null,subcategory:21,type:'tickets',label: 'Termination', category: 'HR', subCategory: 'Employee Relations', description: 'Termination related issues.', icon: 'file-earmark-text-fill', color: 'info'},
            }},
            'Request': {id:26,category:17,subcategory:null,type:'tickets',label: 'Request', category: 'HR', description: 'Request related issues.', icon: 'file-earmark-text-fill', color: 'info', opts: sampleOptions.categories.tickets.HRRequest, trigger: '', sub: {
                'Vacation Request': {id:27,category:null,subcategory:26,type:'tickets',label: 'Vacation Request', category: 'HR', subCategory: 'Request', description: 'Request for vacation', icon: 'umbrella-beach', color: 'info'},
                'Sick Day Request': {id:28,category:null,subcategory:26,type:'tickets',label: 'Sick Day Request', category: 'HR', subCategory: 'Request', description: 'Sick leave requests', icon: 'procedures', color: 'info'},
            }},
        }},
        'IT': {id:29,category:null,subcategory:null,type:'tickets',label: 'IT', description: 'Information Technology related issues.', icon: 'cpu-fill', color: 'info', sub: {
            'Software Issues': {id:30,category:29,subcategory:null,type:'tickets',label: 'Software Issues', category: 'IT', description: 'Troubleshooting software issues', icon: 'laptop-code', color: 'warning', opts: sampleOptions.categories.tickets.default, trigger: '', sub: {
                'Microsoft Office Issues': {id:31,category:null,subcategory:30,type:'tickets',label: 'Microsoft Office Issues', category: 'IT', subCategory: 'Software Issues', description: 'Troubleshooting Microsoft Office issues', icon: 'file-earmark-text-fill', color: 'warning'},
                'Adobe Issues': {id:32,category:null,subcategory:30,type:'tickets',label: 'Adobe Issues', category: 'IT', subCategory: 'Software Issues', description: 'Troubleshooting Adobe issues', icon: 'file-earmark-text-fill', color: 'warning'},
                'ITMR4 Issues': {id:33,category:null,subcategory:30,type:'tickets',label: 'ITMR4 Issues', category: 'IT', subCategory: 'Software Issues', description: 'Troubleshooting ITMR4 issues', icon: 'file-earmark-text-fill', color: 'warning'},
                'ITMR5 Issues': {id:34,category:null,subcategory:30,type:'tickets',label: 'ITMR5 Issues', category: 'IT', subCategory: 'Software Issues', description: 'Troubleshooting ITMR5 issues', icon: 'file-earmark-text-fill', color: 'warning'},
                'eM Client Issues': {id:35,category:null,subcategory:30,type:'tickets',label: 'eM Client Issues', category: 'IT', subCategory: 'Software Issues', description: 'Troubleshooting eM Client issues', icon: 'file-earmark-text-fill', color: 'warning'},
                'Other Software Issues': {id:36,category:null,subcategory:30,type:'tickets',label: 'Other Software Issues', category: 'IT', subCategory: 'Software Issues', description: 'Troubleshooting other software issues', icon: 'file-earmark-text-fill', color: 'warning'},
            }},
            'Network Issues': {id:37,category:29,subcategory:null,type:'tickets',label: 'Network Issues', category: 'IT', description: 'Troubleshooting network issues', icon: 'router', color: 'warning', opts: sampleOptions.categories.tickets.default, trigger: '', sub: {
                'Internet Issues': {id:38,category:null,subcategory:37,type:'tickets',label: 'Internet Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting internet issues', icon: 'wifi', color: 'warning'},
                'Intranet Issues': {id:39,category:null,subcategory:37,type:'tickets',label: 'Intranet Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting intranet issues', icon: 'wifi', color: 'warning'},
                'VPN Issues': {id:40,category:null,subcategory:37,type:'tickets',label: 'VPN Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting VPN issues', icon: 'wifi', color: 'warning'},
                'LAN Issues': {id:41,category:null,subcategory:37,type:'tickets',label: 'LAN Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting LAN issues', icon: 'wifi', color: 'warning'},
                'WAN Issues': {id:42,category:null,subcategory:37,type:'tickets',label: 'WAN Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting WAN issues', icon: 'wifi', color: 'warning'},
                'Wireless Issues': {id:43,category:null,subcategory:37,type:'tickets',label: 'Wireless Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting wireless issues', icon: 'wifi', color: 'warning'},
                'Firewall Issues': {id:44,category:null,subcategory:37,type:'tickets',label: 'Firewall Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting firewall issues', icon: 'wifi', color: 'warning'},
                'Router Issues': {id:45,category:null,subcategory:37,type:'tickets',label: 'Router Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting router issues', icon: 'wifi', color: 'warning'},
                'Switch Issues': {id:46,category:null,subcategory:37,type:'tickets',label: 'Switch Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting switch issues', icon: 'wifi', color: 'warning'},
                'Modem Issues': {id:47,category:null,subcategory:37,type:'tickets',label: 'Modem Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting modem issues', icon: 'wifi', color: 'warning'},
                'Network Cable Issues': {id:48,category:null,subcategory:37,type:'tickets',label: 'Network Cable Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting network cable issues', icon: 'wifi', color: 'warning'},
                'Network Card Issues': {id:49,category:null,subcategory:37,type:'tickets',label: 'Network Card Issues', category: 'IT', subCategory: 'Network Issues', description: 'Troubleshooting network card issues', icon: 'wifi', color: 'warning'},
            }},
            'Server Issues': {id:50,category:29,subcategory:null,type:'tickets',label: 'Server Issues', category: 'IT', description: 'Troubleshooting server issues', icon: 'hdd', color: 'warning', opts: sampleOptions.categories.tickets.default, trigger: '', sub: {
                'Database Issues': {id:51,category:null,subcategory:50,type:'tickets',label: 'Database Issues', category: 'IT', subCategory: 'Server Issues', description: 'Troubleshooting database issues', icon: 'database', color: 'warning'},
                'File Server Issues': {id:52,category:null,subcategory:50,type:'tickets',label: 'File Server Issues', category: 'IT', subCategory: 'Server Issues', description: 'Troubleshooting file server issues', icon: 'file-earmark', color: 'warning'},
                'Print Server Issues': {id:53,category:null,subcategory:50,type:'tickets',label: 'Print Server Issues', category: 'IT', subCategory: 'Server Issues', description: 'Troubleshooting print server issues', icon: 'printer', color: 'warning'},
                'Application Server Issues': {id:54,category:null,subcategory:50,type:'tickets',label: 'Application Server Issues', category: 'IT', subCategory: 'Server Issues', description: 'Troubleshooting application server issues', icon: 'server', color: 'warning'},
                'Authentication Server Issues': {id:55,category:null,subcategory:50,type:'tickets',label: 'Authentication Server Issues', category: 'IT', subCategory: 'Server Issues', description: 'Troubleshooting authentication server issues', icon: 'person-badge', color: 'warning'},
            }},
            'Service Issues': {id:56,category:29,subcategory:null,type:'tickets',label: 'Service Issues', category: 'IT', description: 'Troubleshooting service issues', icon: 'cloud-fog', color: 'warning', opts: sampleOptions.categories.tickets.default, trigger: '', sub: {
                'Cloud Issues': {id:57,category:null,subcategory:56,type:'tickets',label: 'Cloud Issues', category: 'IT', subCategory: 'Service Issues', description: 'Troubleshooting cloud issues', icon: 'cloud-fog', color: 'warning'},
                'Email Issues': {id:58,category:null,subcategory:56,type:'tickets',label: 'Email Issues', category: 'IT', subCategory: 'Service Issues', description: 'Troubleshooting email issues', icon: 'envelope-fill', color: 'warning'},
                'Website Issues': {id:59,category:null,subcategory:56,type:'tickets',label: 'Web Issues', category: 'IT', subCategory: 'Service Issues', description: 'Troubleshooting website issues', icon: 'globe', color: 'warning'},
                'Virtual Desktop Issues': {id:60,category:null,subcategory:56,type:'tickets',label: 'Virtual Desktop Issues', category: 'IT', subCategory: 'Service Issues', description: 'Troubleshooting virtual desktop issues', icon: 'desktop', color: 'warning'},
            }},
            'Remote Assistance': {id:61,category:29,subcategory:null,type:'tickets',label: 'Remote Assistance', category: 'IT', description: 'Remote assistance', icon: 'file-earmark-arrow-up-fill', color: 'warning', opts: sampleOptions.categories.tickets.ITRemoteAssistance, trigger: ''},
        }},
        'Legal': {id:62,category:null,subcategory:null,type:'tickets',label: 'Legal', description: 'Legal related issues.', icon: 'gavel-fill', color: 'info', sub: {
            'Contract Review': {id:63,category:62,subcategory:null,type:'tickets',label: 'Contract Review', category: 'Legal', description: 'Legal review of contracts',  icon: 'file-contract', color: 'secondary', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
        'Logistics': {id:64,category:null,subcategory:null,type:'tickets',label: 'Logistics', description: 'Logistics related issues.', icon: 'truck', color: 'info', sub: {
            'Delivery Tracking': {id:65,category:64,subcategory:null,type:'tickets',label: 'Delivery Tracking', category: 'Logistics', description: 'Logistics and delivery tracking',  icon: 'truck', color: 'light', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Customer Service': {id:66,category:64,subcategory:null,type:'tickets',label: 'Customer Service', category: 'Logistics', description: 'Customer Service related issues.',  icon: 'people-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Tracking': {id:67,category:64,subcategory:null,type:'tickets',label: 'Tracking', category: 'Logistics', description: 'Track operational activities',  icon: 'map-marked', color: 'dark', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
        'Operations': {id:68,category:null,subcategory:null,type:'tickets',label: 'Operations', description: 'Operations related issues.', icon: 'tools', color: 'info', sub: {
            'Process Improvement': {id:69,category:68,subcategory:null,type:'tickets',label: 'Process Improvement', category: 'Operations', description: 'Improvement of operational processes',  icon: 'tools', color: 'dark', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Dispatch': {id:70,category:68,subcategory:null,type:'tickets',label: 'Dispatch', category: 'Operations', description: 'Manage dispatch operations',  icon: 'forward', color: 'dark', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Tracking': {id:71,category:68,subcategory:null,type:'tickets',label: 'Tracking', category: 'Operations', description: 'Track operational activities',  icon: 'map-marked', color: 'dark', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
        'Sales': {id:72,category:null,subcategory:null,type:'tickets',label: 'Sales', description: 'Sales related issues.', icon: 'cart-fill', color: 'info', sub: {
            'Client Prospecting': {id:73,category:72,subcategory:null,type:'tickets',label: 'Client Prospecting', category: 'Sales', description: 'Prospecting new clients',  icon: 'handshake', color: 'primary', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Customer Service': {id:74,category:72,subcategory:null,type:'tickets',label: 'Customer Service', category: 'Sales', description: 'Customer Service related issues.',  icon: 'people-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
            'Contracts': {id:75,category:72,subcategory:null,type:'tickets',label: 'Contracts', category: 'Sales', description: 'Contracts related issues.',  icon: 'file-earmark-text-fill', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
        'Security': {id:76,category:null,subcategory:null,type:'tickets',label: 'Security', description: 'Security related issues.', icon: 'shield-lock-fill', color: 'info', sub: {
            'Access Control': {id:77,category:76,subcategory:null,type:'tickets',label: 'Access Control', category: 'Security', description: 'Manage security access control',  icon: 'shield-alt', color: 'danger', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
        'Other': {id:78,category:null,subcategory:null,type:'tickets',label: 'Other', description: 'Other issues.', icon: 'question-circle-fill', color: 'info', sub: {
            'General Enquiry': {id:79,category:78,subcategory:null,type:'tickets',label: 'General Enquiry', category: 'Other', description: 'General enquiries and other issues',  icon: 'question', color: 'info', opts: sampleOptions.categories.tickets.default, trigger: ''},
        }},
    },
};

var tmpRecordsTickets = [];
for (var id = 1; id <= 20; id++){
    var randomOwner = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    var randomUpdatedBy = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    var randomAssignedTo = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    var randomAssignedBy = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    var randomStatus = parseInt(Object.keys(sampleStatuses.tickets)[Math.floor(Math.random() * Object.keys(sampleStatuses.tickets).length)]);
    var randomPriority = parseInt(Object.keys(samplePriorities.tickets)[Math.floor(Math.random() * Object.keys(samplePriorities.tickets).length)]);
    var randomCategoryKeys = Object.keys(sampleCategories.tickets);
    var randomCategory = randomCategoryKeys[Math.floor(Math.random() * randomCategoryKeys.length)];
    randomCategory = sampleCategories.tickets[randomCategory];
    if(typeof randomCategory.sub !== 'undefined' && Object.keys(randomCategory.sub).length > 0){
        var randomSubCategoryKeys = Object.keys(randomCategory.sub);
        var randomSubCategory = randomSubCategoryKeys[Math.floor(Math.random() * randomSubCategoryKeys.length)];
        randomSubCategory = randomCategory.sub[randomSubCategory];
    }
    if(typeof randomSubCategory !== 'undefined' && typeof randomSubCategory.sub !== 'undefined' && Object.keys(randomSubCategory.sub).length > 0){
        var randomItemKeys = Object.keys(randomSubCategory.sub);
        var randomItem = randomItemKeys[Math.floor(Math.random() * randomItemKeys.length)];
        randomItem = randomSubCategory.sub[randomItem];
    }

    var sample = {
        id:id,
        created:sampleDate,
        modified:sampleDate,
        owner:randomOwner, 
        updatedBy:randomUpdatedBy, 
        organization:'Head Quarters',
        office:'Head Quarters',
        team:'IT',
        status:randomStatus,
        priority:randomPriority,
        category:null,
        subCategory:null,
        item:null,
        subject:sampleLoremTitle,
        description:sampleLoremContent,
        assignedTo:randomAssignedTo,
        assignedBy:randomAssignedBy,
        remoteID:'123456789',
        remotePassword:'!QAZxsw2',
        start:sampleDate,
        end:sampleDate,
        assignedOn:sampleDate,
        openedOn:sampleDate,
        closedOn:sampleDate,
        posts:samplePosts.tickets,
        references:sampleReferences,
        meta:sampleMeta,
        unique:sampleUnique,
        files:sampleFiles.tickets,
    };
    if(typeof randomCategory !== 'undefined' && typeof randomCategory.label !== 'undefined'){
        sample.category = randomCategory.label;
    }
    if(typeof randomSubCategory !== 'undefined' && typeof randomSubCategory.label !== 'undefined'){
        sample.subCategory = randomSubCategory.label;
    }
    if(typeof randomItem !== 'undefined' && typeof randomItem.label !== 'undefined'){
        sample.item = randomItem.label;
    }
    tmpRecordsTickets.push(sample);
}
const sampleRecordsTickets = tmpRecordsTickets;

var tmpRecordsFaqs = [];
for (var id = 1; id <= 10; id++){
    var randomOwner = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    var randomUpdatedBy = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];

    var sample = {
        id:id,
        created:sampleDate,
        modified:sampleDate,
        owner:randomOwner, 
        updatedBy:randomUpdatedBy, 
        title: sampleLoremTitle,
        content: sampleLoremContent,
    };

    tmpRecordsFaqs.push(sample);
}
const sampleRecordsFaqs = tmpRecordsFaqs;

const sampleRecords = {
    default: [],
    tickets: sampleRecordsTickets,
    users: sampleUsers,
    organizations: sampleOrganizations,
    profile: sampleUsers[0],
    faqs: sampleRecordsFaqs,
    quiz: {
        review: {
            employee: {
                english: [
                    {
                        "label": "How comfortable are you with our company's customs brokerage software? Please explain your rating.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Uncomfortable, ..., 10-Very Comfortable",
                        "scale": ["Very Uncomfortable", "Uncomfortable", "Somewhat Uncomfortable", "Slightly Uncomfortable", "Neutral", "Slightly Comfortable", "Somewhat Comfortable", "Comfortable", "Very Comfortable", "Extremely Comfortable"]
                    },
                    {
                        "label": "How well can you navigate customs-related problems for our clients? Please share a recent example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Poorly, ..., 10-Very Well",
                        "scale": ["Very Poorly", "Poorly", "Somewhat Poorly", "Slightly Poorly", "Neutral", "Slightly Well", "Somewhat Well", "Well", "Very Well", "Extremely Well"]
                    },
                    {
                        "label": "How effectively do you stay updated with changes in tariffs and customs regulations? Please explain your strategies.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffectively, ..., 10-Very Effectively",
                        "scale": ["Very Ineffectively", "Ineffectively", "Somewhat Ineffectively", "Slightly Ineffectively", "Neutral", "Slightly Effectively", "Somewhat Effectively", "Effectively", "Very Effectively", "Extremely Effectively"]
                    },
                    {
                        "label": "How efficient are you in ensuring compliance with import and export regulations? Can you share an instance that supports your rating?",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Inefficient, ..., 10-Very Efficient",
                        "scale": ["Very Inefficient", "Inefficient", "Somewhat Inefficient", "Slightly Inefficient", "Neutral", "Slightly Efficient", "Somewhat Efficient", "Efficient", "Very Efficient", "Extremely Efficient"]
                    },
                    {
                        "label": "How effectively do you handle situations when goods are delayed at customs? Please provide a recent example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffectively, ..., 10-Very Effectively",
                        "scale": ["Very Ineffectively", "Ineffectively", "Somewhat Ineffectively", "Slightly Ineffectively", "Neutral", "Slightly Effectively", "Somewhat Effectively", "Effectively", "Very Effectively", "Extremely Effectively"]
                    },
                    {
                        "label": "How proficient are you in coordinating with customs officials? Please share an example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Not at All Proficient, ..., 10-Very Proficient",
                        "scale": ["Not at All Proficient", "Very Little Proficiency", "Little Proficiency", "Some Proficiency", "Neutral", "Slightly Proficient", "Somewhat Proficient", "Proficient", "Very Proficient", "Extremely Proficient"]
                    },
                    {
                        "label": "How adept are you in preparing and submitting necessary documentation for imports and exports? Can you describe an instance that supports your rating?",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Inept, ..., 10-Very Adept",
                        "scale": ["Very Inept", "Inept", "Somewhat Inept", "Slightly Inept", "Neutral", "Slightly Adept", "Somewhat Adept", "Adept", "Very Adept", "Extremely Adept"]
                    },
                    {
                        "label": "How efficiently can you calculate and arrange for the payment of duties and taxes? Please provide an example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Inefficiently, ..., 10-Very Efficiently",
                        "scale": ["Very Inefficiently", "Inefficiently", "Somewhat Inefficiently", "Slightly Inefficiently", "Neutral", "Slightly Efficiently", "Somewhat Efficiently", "Efficiently", "Very Efficiently", "Extremely Efficiently"]
                    },
                    {
                        "label": "How capable are you in handling import and export restrictions? Please explain.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Incapable, ..., 10-Very Capable",
                        "scale": ["Very Incapable", "Incapable", "Somewhat Incapable", "Slightly Incapable", "Neutral", "Slightly Capable", "Somewhat Capable", "Capable", "Very Capable", "Extremely Capable"]
                    },
                    {
                        "label": "How comfortable are you in advising clients on trade-related matters such as insurance requirements, quotas, etc.? Please share a recent example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Uncomfortable, ..., 10-Very Comfortable",
                        "scale": ["Very Uncomfortable", "Uncomfortable", "Somewhat Uncomfortable", "Slightly Uncomfortable", "Neutral", "Slightly Comfortable", "Somewhat Comfortable", "Comfortable", "Very Comfortable", "Extremely Comfortable"]
                    }
                ],
                french: [
                    {
                        "label": "À quel point êtes-vous à l'aise avec le logiciel de courtage en douane de notre entreprise ? Veuillez expliquer votre évaluation.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inconfortable, ..., 10-Très confortable",
                        "scale": ["Très inconfortable", "Inconfortable", "Assez inconfortable", "Peu inconfortable", "Neutre", "Peu confortable", "Assez confortable", "Confortable", "Très confortable", "Extrêmement confortable"]
                    },
                    {
                        "label": "Comment naviguez-vous efficacement les problèmes douaniers pour nos clients ? Veuillez partager un exemple récent.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très mal, ..., 10-Très bien",
                        "scale": ["Très mal", "Mal", "Assez mal", "Peu mal", "Neutre", "Peu bien", "Assez bien", "Bien", "Très bien", "Extrêmement bien"]
                    },
                    {
                        "label": "Comment restez-vous efficacement à jour avec les changements de tarifs et de réglementations douanières ? Veuillez expliquer vos stratégies.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficacement, ..., 10-Très efficacement",
                        "scale": ["Très inefficacement", "Inefficacement", "Assez inefficacement", "Peu inefficacement", "Neutre", "Peu efficacement", "Assez efficacement", "Efficacement", "Très efficacement", "Extrêmement efficacement"]
                    },
                    {
                        "label": "À quel point êtes-vous efficace pour garantir la conformité avec les réglementations d'importation et d'exportation ? Pouvez-vous partager un exemple qui soutient votre évaluation ?",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficace, ..., 10-Très efficace",
                        "scale": ["Très inefficace", "Inefficace", "Assez inefficace", "Peu inefficace", "Neutre", "Peu efficace", "Assez efficace", "Efficace", "Très efficace", "Extrêmement efficace"]
                    },
                    {
                        "label": "Comment gérez-vous efficacement les situations où les marchandises sont retardées en douane ? Veuillez fournir un exemple récent.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficacement, ..., 10-Très efficacement",
                        "scale": ["Très inefficacement", "Inefficacement", "Assez inefficacement", "Peu inefficacement", "Neutre", "Peu efficacement", "Assez efficacement", "Efficacement", "Très efficacement", "Extrêmement efficacement"]
                    },
                    {
                        "label": "Quelle est votre maîtrise de la coordination avec les agents des douanes ? Veuillez partager un exemple.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Pas du tout compétent, ..., 10-Très compétent",
                        "scale": ["Pas du tout compétent", "Très peu compétent", "Peu compétent", "Assez compétent", "Neutre", "Légèrement compétent", "Assez compétent", "Compétent", "Très compétent", "Extrêmement compétent"]
                    },
                    {
                        "label": "À quel point êtes-vous compétent pour préparer et soumettre les documents nécessaires à l'importation et à l'exportation ? Pouvez-vous décrire une instance qui soutient votre évaluation ?",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Pas du tout compétent, ..., 10-Très compétent",
                        "scale": ["Pas du tout compétent", "Très peu compétent", "Peu compétent", "Assez compétent", "Neutre", "Légèrement compétent", "Assez compétent", "Compétent", "Très compétent", "Extrêmement compétent"]
                    },
                    {
                        "label": "Comment pouvez-vous calculer et organiser efficacement le paiement des droits et taxes ? Veuillez fournir un exemple.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficacement, ..., 10-Très efficacement",
                        "scale": ["Très inefficacement", "Inefficacement", "Assez inefficacement", "Peu inefficacement", "Neutre", "Peu efficacement", "Assez efficacement", "Efficacement", "Très efficacement", "Extrêmement efficacement"]
                    },
                    {
                        "label": "À quel point êtes-vous capable de gérer les restrictions d'importation et d'exportation ? Veuillez expliquer.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Pas du tout compétent, ..., 10-Très compétent",
                        "scale": ["Pas du tout compétent", "Très peu compétent", "Peu compétent", "Assez compétent", "Neutre", "Légèrement compétent", "Assez compétent", "Compétent", "Très compétent", "Extrêmement compétent"]
                    },
                    {
                        "label": "À quel point êtes-vous à l'aise pour conseiller les clients sur des questions liées au commerce, comme les exigences en matière d'assurance, les quotas, etc. ? Veuillez partager un exemple récent.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Pas du tout compétent, ..., 10-Très compétent",
                        "scale": ["Pas du tout compétent", "Très peu compétent", "Peu compétent", "Assez compétent", "Neutre", "Légèrement compétent", "Assez compétent", "Compétent", "Très compétent", "Extrêmement compétent"]
                    }
                ]
            },
            manager: {
                english: [
                    {
                        "label": "How effectively do you ensure your team stays updated with the latest customs regulations and tariff changes? Please explain your strategies.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffectively, ..., 10-Very Effectively",
                        "scale": ["Very Ineffectively", "Ineffectively", "Somewhat Ineffectively", "Slightly Ineffectively", "Neutral", "Slightly Effectively", "Somewhat Effectively", "Effectively", "Very Effectively", "Extremely Effectively"]
                    },
                    {
                        "label": "How efficiently do you manage your team's workload related to customs brokerage activities? Please share an example that supports your rating.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Inefficiently, ..., 10-Very Efficiently",
                        "scale": ["Very Inefficiently", "Inefficiently", "Somewhat Inefficiently", "Slightly Inefficiently", "Neutral", "Slightly Efficiently", "Somewhat Efficiently", "Efficiently", "Very Efficiently", "Extremely Efficiently"]
                    },
                    {
                        "label": "How effectively do you handle conflicts or issues that arise within the team? Can you share a recent instance?",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffectively, ..., 10-Very Effectively",
                        "scale": ["Very Ineffectively", "Ineffectively", "Somewhat Ineffectively", "Slightly Ineffectively", "Neutral", "Slightly Effectively", "Somewhat Effectively", "Effectively", "Very Effectively", "Extremely Effectively"]
                    },
                    {
                        "label": "How successfully do you delegate tasks and responsibilities among team members to ensure timely and efficient customs brokerage? Please explain your approach.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Not Successful at All, ..., 10-Very Successful",
                        "scale": ["Not Successful at All", "Very Little Success", "Little Success", "Some Success", "Neutral", "Slightly Successful", "Somewhat Successful", "Successful", "Very Successful", "Extremely Successful"]
                    },
                    {
                        "label": "How effective is your communication with your team members, especially in situations where immediate action is required (for example, goods being held at customs)? Please share an example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffective, ..., 10-Very Effective",
                        "scale": ["Very Ineffective", "Ineffective", "Somewhat Ineffective", "Slightly Ineffective", "Neutral", "Slightly Effective", "Somewhat Effective", "Effective", "Very Effective", "Extremely Effective"]
                    },
                    {
                        "label": "How well do you coordinate with your team to solve customs-related problems? Please share a recent example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffectively, ..., 10-Very Effectively",
                        "scale": ["Very Ineffectively", "Ineffectively", "Somewhat Ineffectively", "Slightly Ineffectively", "Neutral", "Slightly Effectively", "Somewhat Effectively", "Effectively", "Very Effectively", "Extremely Effectively"]
                    },
                    {
                        "label": "How well do you handle disputes or disagreements within your team? Please provide an example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffectively, ..., 10-Very Effectively",
                        "scale": ["Very Ineffectively", "Ineffectively", "Somewhat Ineffectively", "Slightly Ineffectively", "Neutral", "Slightly Effectively", "Somewhat Effectively", "Effectively", "Very Effectively", "Extremely Effectively"]
                    },
                    {
                        "label": "How effective are your strategies for training new employees in customs brokerage? Please explain.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffective, ..., 10-Very Effective",
                        "scale": ["Very Ineffective", "Ineffective", "Somewhat Ineffective", "Slightly Ineffective", "Neutral", "Slightly Effective", "Somewhat Effective", "Effective", "Very Effective", "Extremely Effective"]
                    },
                    {
                        "label": "How do you evaluate and ensure the quality of work done by your team members? Please provide details.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffectively, ..., 10-Very Effectively",
                        "scale": ["Very Ineffectively", "Ineffectively", "Somewhat Ineffectively", "Slightly Ineffectively", "Neutral", "Slightly Effectively", "Somewhat Effectively", "Effectively", "Very Effectively", "Extremely Effectively"]
                    },
                    {
                        "label": "How adeptly have you handled a situation where a team member made an error in documentation or customs procedure? Please describe the instance.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffectively, ..., 10-Very Effectively",
                        "scale": ["Very Ineffectively", "Ineffectively", "Somewhat Ineffectively", "Slightly Ineffectively", "Neutral", "Slightly Effectively", "Somewhat Effectively", "Effectively", "Very Effectively", "Extremely Effectively"]
                    },
                    {
                        "label": "How effective are you in ensuring that your team meets deadlines, especially during peak times? Please explain your methods.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffective, ..., 10-Very Effective",
                        "scale": ["Very Ineffective", "Ineffective", "Somewhat Ineffective", "Slightly Ineffective", "Neutral", "Slightly Effective", "Somewhat Effective", "Effective", "Very Effective", "Extremely Effective"]
                    },
                    {
                        "label": "How successful have you been in encouraging professional growth within your team? Please provide an example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Not Successful at All, ..., 10-Very Successful",
                        "scale": ["Not Successful at All", "Very Little Success", "Little Success", "Some Success", "Neutral", "Slightly Successful", "Somewhat Successful", "Successful", "Very Successful", "Extremely Successful"]
                    },
                    {
                        "label": "How effective have your communication strategies been in disseminating important information to the team? Please share an example.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffective, ..., 10-Very Effective",
                        "scale": ["Very Ineffective", "Ineffective", "Somewhat Ineffective", "Slightly Ineffective", "Neutral", "Slightly Effective", "Somewhat Effective", "Effective", "Very Effective", "Extremely Effective"]
                    },
                    {
                        "label": "How well do you ensure the team adheres to all compliance requirements? Please explain your strategies.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Very Ineffectively, ..., 10-Very Effectively",
                        "scale": ["Very Ineffectively", "Ineffectively", "Somewhat Ineffectively", "Slightly Ineffectively", "Neutral", "Slightly Effectively", "Somewhat Effectively", "Effectively", "Very Effectively", "Extremely Effectively"]
                    }
                ],
                french: [
                    {
                        "label": "Comment vous assurez-vous efficacement que votre équipe reste à jour avec les dernières réglementations douanières et modifications tarifaires ? Veuillez expliquer vos stratégies.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficacement, ..., 10-Très efficacement",
                        "scale": ["Très inefficacement", "Inefficacement", "Assez inefficacement", "Peu inefficacement", "Neutre", "Peu efficacement", "Assez efficacement", "Efficacement", "Très efficacement", "Extrêmement efficacement"]
                    },
                    {
                        "label": "Comment gérez-vous efficacement la charge de travail de votre équipe liée aux activités de courtage en douane ? Veuillez partager un exemple qui soutient votre évaluation.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficace, ..., 10-Très efficace",
                        "scale": ["Très inefficace", "Inefficace", "Assez inefficace", "Peu inefficace", "Neutre", "Peu efficace", "Assez efficace", "Efficace", "Très efficace", "Extrêmement efficace"]
                    },
                    {
                        "label": "Comment gérez-vous efficacement les conflits ou problèmes qui surgissent au sein de l'équipe ? Pouvez-vous partager un exemple récent ?",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficacement, ..., 10-Très efficacement",
                        "scale": ["Très inefficacement", "Inefficacement", "Assez inefficacement", "Peu inefficacement", "Neutre", "Peu efficacement", "Assez efficacement", "Efficacement", "Très efficacement", "Extrêmement efficacement"]
                    },
                    {
                        "label": "Comment déléguez-vous avec succès les tâches et responsabilités parmi les membres de l'équipe pour assurer un courtage en douane en temps et efficace ? Veuillez expliquer votre approche.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Pas du tout réussi, ..., 10-Très réussi",
                        "scale": ["Pas du tout réussi", "Très peu réussi", "Peu réussi", "Assez réussi", "Neutre", "Légèrement réussi", "Assez réussi", "Réussi", "Très réussi", "Extrêmement réussi"]
                    },
                    {
                        "label": "Quelle est l'efficacité de votre communication avec les membres de votre équipe, surtout dans les situations où une action immédiate est requise (par exemple, des marchandises retenues en douane) ? Veuillez partager un exemple.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficace, ..., 10-Très efficace",
                        "scale": ["Très inefficace", "Inefficace", "Assez inefficace", "Peu inefficace", "Neutre", "Peu efficace", "Assez efficace", "Efficace", "Très efficace", "Extrêmement efficace"]
                    },
                    {
                        "label": "Comment coordonnez-vous bien avec votre équipe pour résoudre les problèmes douaniers ? Veuillez partager un exemple récent.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficacement, ..., 10-Très efficacement",
                        "scale": ["Très inefficacement", "Inefficacement", "Assez inefficacement", "Peu inefficacement", "Neutre", "Peu efficacement", "Assez efficacement", "Efficacement", "Très efficacement", "Extrêmement efficacement"]
                    },
                    {
                        "label": "Comment gérez-vous bien les disputes ou désaccords au sein de votre équipe ? Veuillez fournir un exemple.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficacement, ..., 10-Très efficacement",
                        "scale": ["Très inefficacement", "Inefficacement", "Assez inefficacement", "Peu inefficacement", "Neutre", "Peu efficacement", "Assez efficacement", "Efficacement", "Très efficacement", "Extrêmement efficacement"]
                    },
                    {
                        "label": "Comment sont efficaces vos stratégies pour former les nouveaux employés en courtage en douane ? Veuillez expliquer.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficace, ..., 10-Très efficace",
                        "scale": ["Très inefficace", "Inefficace", "Assez inefficace", "Peu inefficace", "Neutre", "Peu efficace", "Assez efficace", "Efficace", "Très efficace", "Extrêmement efficace"]
                    },
                    {
                        "label": "Comment évaluez-vous et assurez-vous la qualité du travail effectué par les membres de votre équipe ? Veuillez fournir des détails.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficace, ..., 10-Très efficace",
                        "scale": ["Très inefficace", "Inefficace", "Assez inefficace", "Peu inefficace", "Neutre", "Peu efficace", "Assez efficace", "Efficace", "Très efficace", "Extrêmement efficace"]
                    },
                    {
                        "label": "Comment avez-vous habilement géré une situation où un membre de l'équipe a commis une erreur dans la documentation ou la procédure douanière ? Veuillez décrire l'instance.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficacement, ..., 10-Très efficacement",
                        "scale": ["Très inefficacement", "Inefficacement", "Assez inefficacement", "Peu inefficacement", "Neutre", "Peu efficacement", "Assez efficacement", "Efficacement", "Très efficacement", "Extrêmement efficacement"]
                    },
                    {
                        "label": "Comment êtes-vous efficace pour assurer que votre équipe respecte les délais, surtout pendant les périodes de pointe ? Veuillez expliquer vos méthodes.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficace, ..., 10-Très efficace",
                        "scale": ["Très inefficace", "Inefficace", "Assez inefficace", "Peu inefficace", "Neutre", "Peu efficace", "Assez efficace", "Efficace", "Très efficace", "Extrêmement efficace"]
                    },
                    {
                        "label": "Combien avez-vous réussi à encourager la croissance professionnelle au sein de votre équipe ? Veuillez fournir un exemple.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Pas du tout réussi, ..., 10-Très réussi",
                        "scale": ["Pas du tout réussi", "Très peu réussi", "Peu réussi", "Assez réussi", "Neutre", "Légèrement réussi", "Assez réussi", "Réussi", "Très réussi", "Extrêmement réussi"]
                    },
                    {
                        "label": "Combien vos stratégies de communication ont-elles été efficaces pour diffuser des informations importantes à l'équipe ? Veuillez partager un exemple.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficace, ..., 10-Très efficace",
                        "scale": ["Très inefficace", "Inefficace", "Assez inefficace", "Peu inefficace", "Neutre", "Peu efficace", "Assez efficace", "Efficace", "Très efficace", "Extrêmement efficace"]
                    },
                    {
                        "label": "Comment assurez-vous que l'équipe respecte toutes les exigences de conformité ? Veuillez expliquer vos stratégies.",
                        "range": true,
                        "comment": true,
                        "scaleDescription": "0-Très inefficacement, ..., 10-Très efficacement",
                        "scale": ["Très inefficacement", "Inefficacement", "Assez inefficacement", "Peu inefficacement", "Neutre", "Peu efficacement", "Assez efficacement", "Efficacement", "Très efficacement", "Extrêmement efficacement"]
                    }
                ]
            }
        },
    },
};