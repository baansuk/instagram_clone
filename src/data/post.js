export const posts = [
  {
    date: new Date(2023, 4, 14, 15, 20),
    id: 'anon_1',
    user: "anon",
    likes: ['anon'],
    imgPaths: [ "/anon_1_1.jpeg", "/anon_1_2.jpeg", "/anon_1_3.jpeg"],
    content: "산책 너무 즐거워! \n내일도 모레도 계속 가고싶다!\n고양이도 많아!",
    location: "강서구 화곡동 우장산",
    tags: [ '산책', '나무', '자연', '한적', '고양이', '행복', '즐거움' ],
    comments: [
      {
        user : "anon",
        date : new Date(2023, 4, 16, 12, 20),
        content : "행복하다!",
        likes: [],
        userTags: [],
        subComments: [
          {
            user : "anon",
            date : new Date(2023, 4, 16, 15, 50),
            content : "넘 좋다",
            likes: ['anon'],
            userTags: ['anon'],
          },
        ]
      }
    ],
  },
]