export const users = [{
    id: 'harry',
    name: 'potter',
    password: 'harry1234',
    profilePic: "harry.jpg",
    chats: [
        {
            idc: 'Malfoy',
            name: 'Malfoy',
            img: "malfoy.jpg",
            last: 'no way!',
            lastdate: '18:32 13.04.22',
            text: [{txt: 'Hey Potter! Want to join Slytherin?', sent: true, time: "18:29 13.04.22", type:"txt"},{txt: 'Hey Potter! Want to join Slytherin?', sent: false, time: "18:29 13.04.22", type:"txt"},
            {txt: "no way!", sent: false , time: "18:32 13.04.22",type:"txt"},{txt: "no way!", sent: true , time: "18:32 13.04.22",type:"txt"}]
        },
        {
            idc: 'Hermione',
            name: 'Hermione',
            img: "hermione.jpg",
            last: 'image',
            lastdate: '16:43 13.04.22',
            text: [{txt: 'Does the scar hurt you again?', sent: true, time: "16:29 13.04.22", type:"txt"}
            ]
        },
        {
            idc: 'Ron',
            name: 'Weasley',
            img: "ron.jpg",
            last: 'audio',
            lastdate: '13:56 13.04.22',
            text: [{txt: 'We need to get 100 in the test!', sent: true, time: "13:14 13.04.22", type:"txt"}
            ]
        },
        {
            idc: 'Dumbledore',
            name: 'Dumbush',
            img: "dumbledore.jpg",
            last: 'You are a wizard Harry!',
            lastdate: '10:24 13.04.22',
            text: [{txt: 'You are a wizard Harry!', sent: true, time: "10:24 13.04.22", type:"txt"}]
        },
        {
            idc: 'Voldemort',
            name: 'Tom',
            img: "voldemort.jpeg",
            last: 'video',
            lastdate: '9:02 13.04.22',
            text: [{txt: 'I come for you...', sent: true, time: "9:01 13.04.22", type:"txt"}]
        },
    ]
},{
    id: 'noam',
    name: 'Noamos',
    password: 'noam1234',
    profilePic: "ron.jpg",
    chats: [
    {
        idc: 'harry',
        name: 'potter',
        img: "harry.jpg",
        last: 'Hey my name is noam',
        lastdate: '20:29 14.04.22',
        text: [{txt: 'Hey my name is noam', sent: false, time: "20:29 14.04.22", type:"txt"}]
    },
    
]
},
        {
        id: 'itay',
        name: 'itayos',
        password: 'itay1234',
        profilePic: "dobby.jpg",
        chats: [
            {
                contact: 'harry',
                name: 'potter',
                img: "harry.jpg",
                last: 'Hey my name is noam',
                lastdate: '20:29 14.04.22',
                text: [{txt: 'Hey my name is noam', sent: false, time: "20:29 14.04.22", type:"txt"}]
            },

        ]
    }

]
export default users