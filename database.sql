create Table users(
    id        varchar(10),
    password  varchar(255),
    email     varchar(255),
    firstName varchar(255),
    lastName  varchar(255),
    phone     varchar(10) ,
    birthday  varchar(255),
    gender    varchar(10) ,
    token     varchar(255),
    avatar    varchar(255),
    auth      varchar(255),

    PRIMARY KEY (id)
);



create Table children(
    id          varchar(10),
    firstName   varchar(255),
    lastName    varchar(255),
    birthday    varchar(255),
    motherName  varchar(255),
    motherEmail varchar(255),
    motherPhone varchar(255),
    fatherName  varchar(255),
    fatherEmail varchar(255),
    fatherPhone varchar(255),
    MedicalInfo varchar(255),
    image       varchar(255),

    PRIMARY KEY (id)
);



insert INTO users (id,password, email,firstName,lastName, phone,birthday, gender,token,avatar,auth) Values
("515488950","123123","user1@gamil.com","שושי" ,"שושנה" ,"0505055555"   ,"" ,"female","","","KINDERGARTNER" ),
("515488951","123456","user2@gamil.com","רחל"  ,"רחלה"  ,"0505055555"   ,"" ,"female","","","ASSISTANCE" ),
("515488952","123123","user3@gamil.com","אלה"  ,"אל"    ,"0505055555"   ,"" ,"female","","","ASSISTANCE" ),
("515488953","123123","user4@gamil.com","ירדן" ,"ירדנה" ,"0505055555"   ,"" ,"female","","","ASSISTANCE" );


insert INTO children (id,firstName,lastName,birthday,motherName,motherEmail,motherPhone,fatherName,fatherEmail,fatherPhone,MedicalInfo,image) Values
    ("00000001", "יוסי"  , "dan" , '2024-02-08'  ,"שושי","@@@@","055-555-5555","בוריס","@@@","055-555-5555","",""),
    ("00000002", "מייק"  , "dan" , '2024-02-08'  ,"רותי","@@@@","055-555-5555","סרגיי","@@@","055-555-5555","",""),
    ("00000003", "איציק" , "dan" , '2024-02-08'  ,"רותי","@@@@","055-555-5555","ולדרמיר","@@@","055-555-5555","","");


