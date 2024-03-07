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
("210110110","123123","user1@gmail.com","שושי" ,"שושנה" ,"0505055555"   ,"" ,"female","","static/img/genericKINDERGARTNER.png","KINDERGARTNER",0 ),
("220220220","123123","user2@gmail.com","רחל"  ,"רחלה"  ,"0505055555"   ,"" ,"female","","static/img/assistant1.jpeg","ASSISTANCE",0 ),
("230330330","123123","user3@gmail.com","אלה"  ,"אל"    ,"0505055555"   ,"" ,"female","","static/img/assistant2.jpeg","ASSISTANCE",0 ),
("240440440","123123","user4@gmail.com","ירדן" ,"ירדנה" ,"0505055555"   ,"" ,"female","","static/img/assistant2.jpeg","ASSISTANCE",0 );



insert INTO children (id,firstName,lastName,birthday,gender,motherName,motherEmail,motherPhone,fatherName,fatherEmail,fatherPhone,MedicalInfo,image) Values
    ("201001001", "תמר"  , "רפאלי" , '2024-02-08',"female" ,"שושי","@@@@","055-555-5555","אסי","@@@","055-555-5555","","static/img/children1.jpeg"),
    ("202002002", "מאי"  , "לוי" , '2024-02-08',"female" ,"רותי","@@@@","055-555-5555","דוד","@@@","055-555-5555","","static/img/children2.jpeg"),
    ("203003003", "איציק" , "כהן" , '2024-02-08',"male" ,"יונית","@@@@","055-555-5555","יהונתן","@@@","055-555-5555","","static/img/children3.jpeg"),
    ("205005005", "יובל" , "אופיר" , '2024-02-08',"male" ,"דליה","@@@@","055-555-5555","אביב","@@@","055-555-5555","","static/img/children4.jpeg");



