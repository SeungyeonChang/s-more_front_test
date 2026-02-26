import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CommunityContext = createContext();

const communityReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return { ...state, posts: action.payload };
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] };
    case 'ADD_COMMENT':
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === action.payload.postId
            ? { ...post, comments: [...post.comments, action.payload.comment] }
            : post
        )
      };
    case 'TOGGLE_PARTICIPATE_MODAL':
      return {
        ...state,
        showParticipateModal: action.payload,
        selectedPostId: action.payload ? action.postId : null
      };
    default:
      return state;
  }
};

export const CommunityProvider = ({ children }) => {
  const [state, dispatch] = useReducer(communityReducer, {
    posts: [],
    showParticipateModal: false,
    selectedPostId: null
  });

  // 샘플 데이터
  useEffect(() => {
    const samplePosts = [
      {
        id: 1,
        title: '이번 주말 계곡 캠핑 어때요?',
        author: '캠핑러버',
        date: '2026.02.08',
        content: '동천 계곡 B구역 같이 갈 사람~ 텐트 2인용 가져갈게요!',
        views: 156,
        likes: 23,
        isCampingMate: true,
        comments: [
          {
            id: 1,
            postId: 1,
            author: '초보캠퍼',
            content: '저도 가고싶어요! 텐트 필요없어요!',
            date: '1시간 전',
            replies: [
              {
                id: 1,
                author: '캠핑러버',
                content: '좋아요! 내일 채팅으로 자세히 얘기해요~',
                date: '30분 전'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: '강추! A구역 별보기 최고',
        author: '밤하늘',
        date: '2026.02.07',
        content: '어제 밤에 본 별똥별 3개! 사진 첨부함',
        views: 89,
        likes: 15,
        isCampingMate: false,
        comments: []
      }
    ];
    dispatch({ type: 'SET_POSTS', payload: samplePosts });
  }, []);

  const addComment = (postId, content) => {
    const comment = {
      id: Date.now(),
      postId,
      author: '현재사용자',
      content,
      date: '방금 전',
      replies: []
    };
    dispatch({ type: 'ADD_COMMENT', payload: { postId, comment } });
  };

  const toggleParticipateModal = (show, postId = null) => {
    dispatch({ 
      type: 'TOGGLE_PARTICIPATE_MODAL', 
      payload: show,
      postId 
    });
  };

  return (
    <CommunityContext.Provider value={{
      ...state,
      addComment,
      toggleParticipateModal
    }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => useContext(CommunityContext);
