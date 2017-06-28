// cities 
export const all = ({ commit }, context ) => {
  context.$http.get('/api/v1/cities').then(response => {
        commit('set', { type: 'cities', items: response.data })
    }, response => {
      context.$dialog("Something went wrong");
    });  
}

export const search = ({ commit }, context ) => {
    context.$http.get('/api/v1/cities?search=' + context.query).then(response => {
       commit('set', { type: 'cities', items: response.data })
    }, response => {
      context.$dialog("Something went wrong");
    });  
}

export const getCity = ({ commit }, context ) => {
    context.$http.get('/api/v1/cities/' + context.id).then(response => {
         commit('set', { type: 'city', items: response.data })
      }, response => {
        context.$dialog("Something went wrong");
      });  
}

//auth

export const login_social = ({ commit }, context ) => {
  context.$http.get('/api/v1/custom/'+ context.provider +'/callback?code=' + context.code).then(response => {
      localStorage.setItem('access_token', JSON.stringify(response.data))
      localStorage.setItem('user_id', JSON.stringify(response.data.id))
      context.$router.push('/');
    });
}

export const logout = ({ commit }, context ) => {
  context.$http.delete('/api/v1/auth/sign_out').then(response => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_id');
    });
}

// user

export const getUser = ({ commit }, context ) => {
  context.$http.get('/api/v1/users/' + context.id ).then(response => {
      commit('set', { type: 'user', items: response.data })
    }, response => {
      context.$dialog("Something went wrong");
    });
}

//favorites

export const setFavorite = ({ commit }, context ) => {
    var fave_params  = { city_id: context.id, visited: context.visited }
    context.$http.post('/api/v1/favorites', {favorite: fave_params}).then(response => {
      context.$dialog("Added to Favorites");
    }, response => {
      context.$dialog("Something went wrong");
    }); 
}


//topics

export const saveTopic = ({ commit }, context ) => {
    context.$http.post('/api/v1/topics', context.topic).then(response => {
      context.$dialog("topic created");
      context.$router.push('/topic/' + response.data.id );
    }, response => {
      context.$dialog("Something went wrong");
    }); 
}

export const getTopic = ({ commit }, context ) => {
    context.$http.get('/api/v1/topics/'+ context.id ).then(response => {
      commit('set', { type: 'topic', items: response.data })
    }, response => {
      context.$dialog("Something went wrong");
    });   
}

//comments
export const saveComment = ({ commit }, context ) => {
    var comment_params = { text: context.text, topic_id: context.topic_id }
    context.$http.post('/api/v1/comments', { comment: comment_params }).then(response => {
      context.$dialog("comment created");
    }, response => {
      context.$dialog("Something went wrong");
    });   
}

// ratings
export const setRate = ({ commit }, context ) => {
    var rating_params = { city_id: context.city_id, rate: context.rating, rate_type: context.rate_type }
    context.$http.post('/api/v1/ratings', { rating: rating_params }).then(response => {
      context.$dialog("thx for rate");
    }, response => {
      context.$dialog("Something went wrong");
    });   
}