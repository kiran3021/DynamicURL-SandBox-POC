interface NodesType {
    name: string,
    url: string
}

type Node = {
    name: string;
    fontSize?: number;
    url?: string;
    show?:boolean;
    nodes?: Node[];
};



export let env = "staging";
export let baseUrl = `https://${env}.simnetonline.com/`;
export let sandboxURL = `http://localhost:5173/sandbox?url=`

export const sitemap: Node[] = [
    {
        name: 'Dashboard',
        fontSize: 1,
        show: true,
        nodes: [
            { name: 'Past Due preferences (overlay)', url: `Manager/MyAccount/MyAccount.aspx` },
            { name: 'Integrity Violations (overlay)', url: `Manager/MyAccount/MyAccount.aspx` },
            { name: 'Upcoming assignments report', url: `Manager/MyAccount/MyAccount.aspx` },
            { name: 'Credential issuance report', url: `Manager/MyAccount/MyAccount.aspx` },
        ],
    },
    {
        name: 'Grades',
        fontSize: 1,
        show: true,
        nodes: [
            {
                name: 'Gradebook',
                fontSize: 1,
                url: `cm/gradebook/main/`,
                nodes: [
                    { name: 'Learner panel (overlay)', url: `` },
                    { name: 'Assignment panel (overlay)', url: `` },
                    { name: 'Grade panel (overlay)', url: `` },
                    { name: 'Settings...', url: `` },
                ],
            },
            { name: 'Resource Submissions', url: `Manager/Resources/Inbox.aspx` },
            {
                name: 'Reports',
                fontSize: 2,
                url: "/Manager/Reports/Reports.aspx",
                nodes: [
                    {
                        name: 'Create',
                        nodes: [
                            { name: 'Course Overview', url: `Manager/Reports/NewReport.aspx` },
                            { name: '...', url: `` },
                        ],
                    },
                ],
            },
        ],
    },
    {
        name: 'Courses',
        show: true,

        nodes: [
            {
                name: 'View all',
                url: "Manager/Classes/FindClass.aspx",
                nodes: [
                    {
                        name: 'Actions',
                        nodes: [
                            {
                                name: 'Snapshot',
                                url: `Manager/Classes/SnapshotClass.aspx`,
                                nodes: [
                                    { name: 'Instructors' },
                                    { name: 'Students' },
                                    { name: 'Assignments' },
                                    { name: 'Credentials' },
                                ],
                            },
                            { name: 'Print Snapshot' },
                            { name: 'Edit/assign' },
                            { name: 'Remove pairing (action)' },
                            { name: 'Overview report' },
                            {
                                name: 'Organizer',
                                nodes: [
                                    { name: 'Global settings (overlay)' },
                                    { name: 'Group settings (overlay)' },
                                    { name: 'Assignment settings (overlay)' },
                                    { name: 'Batch operations (overlay)' },
                                ],
                            },
                            { name: 'Gradebook' },
                            { name: 'Import new learners' },
                            { name: 'Import existing learners' },
                            { name: 'Export roster' },
                            { name: 'Export assignments' },
                            { name: 'Send message' },
                            { name: 'SIMstudent' },
                            { name: 'Delete' },
                        ],
                    },
                ],
            },
            { name: 'Create' },
            { name: 'Organize' },
            { name: 'Import' },
            { name: 'Archive' },
        ],
    },
    {
        name: 'Users',
        show: true,

        nodes: [
            {
                name: 'Instructors',
                nodes: [
                    {
                        name: 'View all',
                        url: "Manager/Instructors/FindInstructor",
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    { name: 'Snapshot', url: "Manager/Instructors/SnapshotInstructor.aspx" },
                                    { name: 'Print snapshot', url: "Manager/Instructors/PrintInstructorSnapshot.aspx" },
                                    {
                                        name: 'Edit/assign',
                                        nodes: [
                                            { name: 'Details', url: "Manager/Instructors/EditInstructor.aspx" },
                                            { name: 'Courses', url: "Manager/Instructors/EditInstructor.aspx" },
                                        ],
                                    },
                                    { name: 'Remove pairing', url: "Manager/Instructors/FindInstructor" },
                                    { name: 'Send message', url: "Manager/Messaging/Messaging.aspx" },
                                    { name: 'View history', url: "Manager/Instructors/FindInstructor" },
                                    { name: 'Delete', url: "Manager/Instructors/FindInstructor" },
                                ],
                            },
                        ],
                    },
                    { name: 'Create', url: "Manager/Instructors/NewInstructor.aspx" },
                    { name: 'Import', url: "Manager/Instructors/Import.aspx" },
                ],
            },
            {
                name: 'Learners',
                nodes: [
                    {
                        name: 'View all',
                        url: "cm/students/main/",
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    { name: 'Snapshot', url: "Manager/Students/SnapshotStudent.aspx" },
                                    { name: 'Print snapshot', url: "Manager/Students/PrintStudentSnapshot.aspx" },
                                    {
                                        name: 'Edit/assign',
                                        url: "Manager/Students/EditStudent.aspx",
                                        nodes: [
                                            { name: 'Details', url: "Manager/Students/EditStudent.aspx" },
                                            { name: 'Courses', url: "Manager/Students/EditStudent.aspx" },
                                            { name: 'Licenses', url: "Manager/Students/EditStudent.aspx" },
                                            { name: 'Time on task', url: "Manager/Students/EditStudent.aspx" },
                                            { name: 'Personal assignments', url: "Manager/Students/EditStudent.aspx" },
                                            { name: 'Credentials', url: "Manager/Students/EditStudent.aspx" },
                                        ],
                                    },
                                    { name: 'Remove pairing', url: "" },
                                    { name: 'Send message', url: "Manager/Messaging/Messaging.aspx" },
                                    { name: 'View history', url: "cm/students/main/" },
                                    { name: 'Delete', url: "cm/students/main/" },
                                ],
                            },
                        ],
                    },
                    { name: 'Create', url: "Manager/Students/NewStudent.aspx" },
                    { name: 'Import', url: "Manager/Students/CombinedImport.aspx" },
                    { name: 'Archive', url: "Manager/Students/Enroll_UnEnroll.aspx" },
                ],
            },
        ],
    },
    {
        name: 'Content',
        show: false,
        nodes: [
            // {show : false},
            {
                name: 'Lessons',
                // show :true,
                nodes: [
                    {
                        name: 'View all',
                        // show : true,
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    { name: 'Preview' },
                                    {
                                        name: 'Snapshot',
                                        nodes: [
                                            { name: 'Skills' },
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Skill details (overlay)' },
                                        ],
                                    },
                                    { name: 'Print snapshot' },
                                    {
                                        name: 'Edit/assign',
                                        nodes: [
                                            { name: 'Skills' },
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Skill details (overlay)' },
                                        ],
                                    },
                                    { name: 'View report' },
                                    { name: 'Copy to lesson' },
                                    { name: 'Copy to template' },
                                    { name: 'Create exam/template' },
                                    { name: 'Delete (overlay)' },
                                ],
                            },
                        ],
                    },
                    { name: 'Create' },
                    { name: 'Archive' },
                    { name: 'Template' },
                    { name: 'Actions' },
                ],
            },
            {
                name: 'SIMbooks',
                nodes: [
                    {
                        name: 'View all',
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    { name: 'Preview' },
                                    {
                                        name: 'Snapshot',
                                        nodes: [
                                            { name: 'Pages' },
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Skill details (overlay)' },
                                        ],
                                    },
                                    { name: 'Print snapshot' },
                                    {
                                        name: 'Edit/assign',
                                        nodes: [
                                            { name: 'Pages' },
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Skill details (overlay)' },
                                        ],
                                    },
                                    { name: 'View report' },
                                    { name: 'Create exam/template' },
                                    { name: 'Download instructor resources (overlay)' },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Exams',

                show: true,
                nodes: [
                    {
                        name: 'View all',
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    { name: 'Preview' },
                                    {
                                        name: 'Snapshot',
                                        nodes: [
                                            { name: 'Questions' },
                                            { name: 'Preferences' },
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Question details (overlay)' },
                                        ],
                                    },
                                    { name: 'Print snapshot' },
                                    {
                                        name: 'Edit/assign',
                                        nodes: [
                                            { name: 'Questions' },
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Question details (overlay)' },
                                        ],
                                    },
                                    { name: 'Print exam (overlay)' },
                                    { name: 'View report' },
                                    { name: 'Copy to exam' },
                                    { name: 'Copy to template' },
                                    { name: 'Create exam/lesson/template' },
                                    { name: 'Delete (overlay)' },
                                ],
                            },
                        ],
                    },
                    { name: 'Create' },
                    { name: 'Archive' },
                    {
                        name: 'Template',
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    { name: 'Preview' },
                                    { name: 'Snapshot' },
                                    { name: 'Print snapshot' },
                                    { name: 'Edit/assign' },
                                    { name: 'Copy to exam' },
                                    { name: 'Copy to template' },
                                    { name: 'Create exam/lesson/template' },
                                    { name: 'Delete (overlay)' },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: 'SIMpaths',
                nodes: [
                    {
                        name: 'View all',
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    {
                                        name: 'Preview',
                                        nodes: [
                                            { name: 'Pre-test' },
                                            { name: 'Lesson' },
                                            { name: 'Post-test' },
                                        ],
                                    },
                                    {
                                        name: 'Snapshot',
                                        nodes: [
                                            { name: 'Questions' },
                                            { name: 'Preferences' },
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                        ],
                                    },
                                    { name: 'Print snapshot' },
                                    {
                                        name: 'Edit/assign',
                                        nodes: [
                                            { name: 'Questions' },
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Question details (overlay)' },
                                        ],
                                    },
                                    { name: 'Print pre-test (overlay)' },
                                    { name: 'Print post-test (overlay)' },
                                    { name: 'View report' },
                                    { name: 'Copy to SIMpath' },
                                    { name: 'Copy to template' },
                                    { name: 'Delete (overlay)' },
                                ],
                            },
                        ],
                    },
                    { name: 'Create' },
                    { name: 'Archive' },
                    { name: 'Template' },
                ],
            },
            {
                name: 'Projects',
                nodes: [
                    {
                        name: 'View all',
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    {
                                        name: 'Snapshot',
                                        nodes: [
                                            { name: 'Course' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Rubrics' },
                                        ],
                                    },
                                    { name: 'Print snapshot' },
                                    {
                                        name: 'Edit/assign',
                                        nodes: [
                                            { name: 'Course' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Rubrics' },
                                        ],
                                    },
                                    { name: 'View report' },
                                    { name: 'View instructions' },
                                    {
                                        name: 'Downloads',
                                        nodes: [
                                            { name: 'Start file' },
                                            { name: 'Windows solution file' },
                                            { name: 'Mac 2016+ solution file' },
                                        ],
                                    },
                                    { name: 'Create exa/lesson/template' },
                                ],
                            },
                        ],
                    },
                    {
                        name: 'Rubrics',
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    { name: 'View (overlay)' },
                                    { name: 'Edit/assign (overlay)' },
                                    { name: 'Copy to rubric (overlay)' },
                                    { name: 'Delete (overlay)' },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                name: 'Resources',
                nodes: [
                    {
                        name: 'View all',
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    {
                                        name: 'Snapshot',
                                        nodes: [
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Supplemental resources' },
                                        ],
                                    },
                                    { name: 'Print snapshot' },
                                    {
                                        name: 'Edit/assign',
                                        nodes: [
                                            { name: 'Courses' },
                                            { name: 'Learners (personal assignment)' },
                                            { name: 'Supplemental resources' },
                                        ],
                                    },
                                    { name: 'Delete (overlay)' },
                                ],
                            },
                        ],
                    },
                    { name: 'Create' },
                ],
            },
            {
                name: 'Test banks',
                nodes: [
                    {
                        name: 'View all',
                        nodes: [
                            {
                                name: 'Actions',
                                nodes: [
                                    { name: 'Edit/assign' },
                                    { name: 'Delete (overlay)' },
                                ],
                            },
                        ],
                    },
                    { name: 'Create' },
                ],
            },
        ],
    },
    {
        name: 'Help',
        show: false,
        nodes: [
            { name: 'Search' },
            { name: 'All Topics (external)' },
            { name: 'Technical Support (external)' },
            { name: 'System requirements (external, goes to Student Portal)' },
            { name: 'Changelog (external)' },
            { name: 'Blog (external)' },
            { name: 'Terms (external)' },
            { name: 'Privacy Policy (external)' },
        ],
    },
    {
        name: 'SIMstudent',
        show: true,
        nodes: [
            { name: 'Library' },
            { name: 'Courses' },
        ],
    },
    {
        name: 'Account',
        nodes: [
            {
                name: 'Profile',
                nodes: [
                    { name: 'Edit profile' },
                ],
            },
            { name: 'Permissions' },
        ],
    },
    {
        name: 'Messaging',
        nodes: [
            { name: 'Inbox' },
            { name: 'Create' },
            { name: 'Drafts' },
            { name: 'Sent' },
        ],
    },
];