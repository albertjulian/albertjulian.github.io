exports.dataMenu = [
  {
    permission: "driver_list",
    label: "Driver",
    logo: "University.svg",
    child: [
      {
        permission: "driver_list",
        label: "Driver List",
        link: "/driverList",
        logo: "UniversityList.svg",
      },
      {
        permission: "favorite_driver_list",
        label: "Favorite Driver List",
        link: "/favoriteDriverList",
        logo: "UniversityFavorite.svg",
      },
      {
        permission: "newsletter",
        label: "Newsletter List",
        link: "/newsletter",
        logo: "Service.svg",
      },
    ],
  },
  {
    permission: "keluar",
    label: "Keluar",
    logo: "Keluar.svg",
  },
];
