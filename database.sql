create Table users(
    id        varchar(15),
    password  varchar(255),
    email     varchar(255),
    firstName varchar(255),
    lastName  varchar(255),
    phone     varchar(10) ,
    birthday  varchar(255),
    gender    varchar(10) ,
    token     varchar(255) DEFAULT 'Null',
    avatar    varchar(255),
    auth      varchar(255),
    notifications int  DEFAULT 0,

    PRIMARY KEY (id)
);


create Table children(
    id          varchar(15),
    firstName   varchar(255),
    lastName    varchar(255),
    birthday    varchar(255),
    gender      varchar(255),
    motherName  varchar(255),
    motherEmail varchar(255),
    motherPhone varchar(255),
    fatherName  varchar(255),
    fatherEmail varchar(255),
    fatherPhone varchar(255),
    medicalInfo varchar(255),
    image       varchar(255),

    PRIMARY KEY (id)
);



create Table messages(
    id           int NOT NULL AUTO_INCREMENT,
    fromID       varchar(15),
    toID         varchar(15),
    confirm      varchar(15) DEFAULT "wait",
    body         varchar(255),
    isRead       boolean DEFAULT false,
    freeDay      varchar(255),
    date         DATE  DEFAULT (CURDATE()),
    PRIMARY KEY (id)
);



insert INTO users (id,password, email,firstName,lastName, phone,birthday, gender,token,avatar,auth,notifications) Values
("i15488950","123123","user1@gmail.com","שושי" ,"שושנה" ,"0505055555"   ,"" ,"female","","static/img/genericKINDERGARTNER.png","KINDERGARTNER",0 ),
("i15488951","123123","user2@gmail.com","רחל"  ,"רחלה"  ,"0505055555"   ,"" ,"female","","","ASSISTANCE",0 ),
("i15488952","123123","user3@gmail.com","אלה"  ,"אל"    ,"0505055555"   ,"" ,"female","","","ASSISTANCE",0 ),
("i15488953","123123","user4@gmail.com","ירדן" ,"ירדנה" ,"0505055555"   ,"" ,"female","","","ASSISTANCE",0 );




insert INTO children (id,firstName,lastName,birthday,gender,motherName,motherEmail,motherPhone,fatherName,fatherEmail,fatherPhone,MedicalInfo,image) Values
    ("i0000001", "יוסי"  , "dan" , '2024-02-08',"female" ,"שושי","@@@@","055-555-5555","בוריס","@@@","055-555-5555","",""),
    ("i0000002", "מייק"  , "dan" , '2024-02-08',"female" ,"רותי","@@@@","055-555-5555","סרגיי","@@@","055-555-5555","",""),
    ("i0000003", "איציק" , "dan" , '2024-02-08',"male" ,"1פטריק","@@@@","055-555-5555","ולדרמיר","@@@","055-555-5555","",""),
    ("i0000004", "איציק" , "dan" , '2024-02-08',"male" ,"2פטריק","@@@@","055-555-5555","ולדרמיר","@@@","055-555-5555","",""),
    ("i0000005", "איציק" , "dan" , '2024-02-08',"male" ,"3פטריק","@@@@","055-555-5555","ולדרמיר","@@@","055-555-5555","",""),
    ("i00000012", "איציק" , "dan" , '2024-02-08',"male" ,"10פטריק","@@@@","055-555-5555","ולדרמיר","@@@","055-555-5555","","");



