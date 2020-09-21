exports.dataMenu = [
    {
        permission:'university_list',
        label: 'University',
        logo:'University.svg',
        child: [
            {
                permission: 'university_list',
                label: 'University List',
                link: '/universityList',
                logo:'UniversityList.svg',
            },
            {
                permission: 'favorite_university_list',
                label: 'Favorite University List',
                link: '/favoriteUniversityList',
                logo:'UniversityFavorite.svg',
            },
            {
                permission: 'newsletter',
                label: 'Newsletter List',
                link: '/newsletter',
                logo:'Service.svg',
            },
        ]
    },
    {
        permission:'keluar',
        label: 'Keluar',
        logo:'Keluar.svg',
    },
]