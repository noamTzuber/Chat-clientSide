export const users = [{
    id: 'harry',
    nickName: 'potter',
    password: 'harry1234',
    profilePic: "harry.jpg",
    chats: [
        {
            contact: 'Malfoy',
            nickName: 'Malfoy',
            img: "malfoy.jpg",
            lastMessage: 'no way!',
            lastTime: '18:32 13.04.22',
            text: [{txt: 'Hey Potter! Want to join Slytherin?', isIncoming: 1, time: "18:29 13.04.22", type:"txt"}, 
            {txt: "no way!", isIncoming: 0 , time: "18:32 13.04.22",type:"txt"}]
        },
        {
            contact: 'Hermione',
            nickName: 'Hermione',
            img: "hermione.jpg",
            lastMessage: 'image',
            lastTime: '16:43 13.04.22',
            text: [{txt: 'Does the scar hurt you again?', isIncoming: 1, time: "16:29 13.04.22", type:"txt"}
            ]
        },
        {
            contact: 'Ron',
            nickName: 'Weasley',
            img: "ron.jpg",
            lastMessage: 'audio',
            lastTime: '13:56 13.04.22',
            text: [{txt: 'We need to get 100 in the test!', isIncoming: 1, time: "13:14 13.04.22", type:"txt"}
            ]
        },
        {
            contact: 'Dumbledore',
            nickName: 'Dumbush',
            img: "dumbledore.jpg",
            lastMessage: 'You are a wizard Harry!',
            lastTime: '10:24 13.04.22',
            text: [{txt: 'You are a wizard Harry!', isIncoming: 1, time: "10:24 13.04.22", type:"txt"}]
        },
        {
            contact: 'Voldemort',
            nickName: 'Tom',
            img: "voldemort.jpeg",
            lastMessage: 'video',
            lastTime: '9:02 13.04.22',
            text: [{txt: 'I come for you...', isIncoming: 1, time: "9:01 13.04.22", type:"txt"}]
        },
    ]
},{
    id: 'noam',
    nickName: 'Noamos',
    password: 'noam1234',
    profilePic: "ron.jpg",
    chats: [
    {
        contact: 'harry',
        nickName: 'potter',
        img: "harry.jpg",
        lastMessage: 'Hey my name is noam',
        lastTime: '20:29 14.04.22',
        text: [{txt: 'Hey my name is noam', isIncoming: 0, time: "20:29 14.04.22", type:"txt"}]
    },
    
]
},
        {
        id: 'itay',
        nickName: 'itayos',
        password: 'itay1234',
        profilePic: "dobby.jpg",
        chats: [
            {
                contact: 'harry',
                nickName: 'potter',
                img: "harry.jpg",
                lastMessage: 'Hey my name is noam',
                lastTime: '20:29 14.04.22',
                text: [{txt: 'Hey my name is noam', isIncoming: 0, time: "20:29 14.04.22", type:"txt"}]
            },

        ]
    }

]
export default users