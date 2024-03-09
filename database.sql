create Table users(
    id        int NOT NULL AUTO_INCREMENT,
    userID    varchar(15),
    password  varchar(255),
    email     varchar(255),
    firstName varchar(255),
    lastName  varchar(255),
    phone     varchar(20) ,
    birthday  varchar(255),
    gender    varchar(10) ,
    token     varchar(255) DEFAULT 'Null',
    avatar    varchar(255),
    auth      varchar(255),
    notifications int  DEFAULT 0,

    PRIMARY KEY (id)
);



create Table children(
    id          int NOT NULL AUTO_INCREMENT,
    childId     varchar(15),
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



insert INTO users
(userID,password,phone,email,firstName,lastName,birthday,gender,avatar,auth,notifications,token) Values
("123456789","123123",'0505050501',"user1@gmail.com","שושי","שושנה","2000-03-02","female","static/img/genericKINDERGARTNER.png","KINDERGARTNER",0,""),
("123456782","123123",'0505050502',"user2@gmail.com","רחלי","רוחלה","2000-03-02","female","static/img/assistant1.jpeg","ASSISTANCE",0,"");,
("123456784","123123",'0505050502',"user2@gmail.com","עדן","עדנה","2000-03-02","female","static/img/assistant2.jpeg","ASSISTANCE",0,"");




insert INTO children (childID,firstName,lastName,birthday,gender,motherName,motherEmail,motherPhone,fatherName,fatherEmail,fatherPhone,MedicalInfo,image) Values
    ("999999991", "יוסי"   , "יוסף" , '2024-02-08',"female" ,"שושי"  ,"1M@gmail.com","055-515-5555","בוריס"  ,"1D@gmail.com","055-555-5551","אין מידע רלוונטי","static/img/child1.jpng"),
    ("999999992", "מייק"   , "מק" , '2024-02-08',"female" ,"רותי"  ,"2M@gmail.com","055-525-5555","סרגיי"  ,"2D@gmail.com","055-555-5552","אין מידע רלוונטי","static/img/child2.jpng"),
    ("999999993", "איציק" , "צחק" , '2024-02-08',"male"   ,"פטריק","3M@gmail.com","055-535-5555","ולדרמיר","3D@gmail.com","055-555-5553","אין מידע רלוונטי","static/img/child3.jpng"),
    ("999999994", "יצחק" , "נצחק" , '2024-02-08',"male"   ,"פטריק","4M@gmail.com","055-545-5555","ולדרמיר","4D@gmail.com","055-555-5554","אין מידע רלוונטי","static/img/child4.jpng");



