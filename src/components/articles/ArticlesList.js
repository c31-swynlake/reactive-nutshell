/*
This component will list all the articles and the user friend's articles. It is has 2 child components
- TheArticle.js which will render the article's
- FriendsArticles.js which will render the friend's articles

*/

import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Card, CardBody , Button} from 'reactstrap';
import TheArticle from './TheArticle'
import ArticleForm from './ArticlesForm'
import ArticleManager from '../../modules/ArticleManager'
import FriendsArticle from './FriendsArticle'
import './articles.css'


class ArticlesList extends Component {
   
    state = {
        userArticles: [],
        articles:[],
        friendsArticles: [],
        friends:[1,2]
    }
    
    componentDidMount() {

        ArticleManager.all()
        .then( allArticlesArray => {
            console.log(this.props.activeUser, allArticlesArray)
            const userArticles = allArticlesArray.filter(articleElement => articleElement.userId === parseInt(this.props.activeUser))

            const friendsArticles = allArticlesArray.filter(articleElement => this.state.friends.find(friend => parseInt(friend) === articleElement.userId))
            // console.log("The current user is: ",this.props.activeUser, "and their articles include: ",userArticles, "and the friends articles are: ", friendsArticles)

            this.setState({
                userArticles: userArticles,
                friendsArticles: friendsArticles,
                articles: allArticlesArray
            })
        })
    }

    //this function will make a fetch call the articles manager to add and this function will be pass
    // as a prop to Articles Form
    addArticle = (articleObj) =>  {
        ArticleManager.post(articleObj)
        .then(() => ArticleManager.all())
        .then(articles => {
            const userArticles = articles.filter(articleElement => articleElement.userId === parseInt(this.props.activeUser))
          this.setState({userArticles: userArticles})
          this.props.history.push("/news")
        })
    }

    // this function will make a fetch call the article manager to make a put request and this function will 
    // be passed as a prop to Article Edit
    updateArticle = (updatedArticleObj, id) => {
        ArticleManager.put(updatedArticleObj, id)
        .then(() => ArticleManager.all())
        .then(articles => {
            const userArticles = articles.filter(articleElement => articleElement.userId === parseInt(this.props.activeUser))
          this.setState({userArticles: userArticles})
          this.props.history.push("/news")
        })
    }

    // this function will make a fetch call for the article manager to make a delete request and this function 
    // will be passed as a prop to article delete
    deleteArticle = (id) => {
        ArticleManager.delete(id)
        .then(() => ArticleManager.all())
        .then(articles => {
            const userArticles = articles.filter(articleElement => articleElement.userId === parseInt(this.props.activeUser))
          this.setState({userArticles: userArticles})
          this.props.history.push("/news")
        })
      }

    render() {
        return (
            <div>
                <ArticleForm {...this.props} addArticle={this.addArticle} activeUser={this.props.activeUser}/>  
                <Card>
                    <CardBody>
                        
                        <div className="users__articles">
                            {
                                this.state.userArticles.map(article => // add {...this.props.deleteArticle}
                                <TheArticle key={article.id} {...this.props} 
                                updateArticle={this.updateArticle} 
                                deleteArticle={this.deleteArticle} 
                                TheArticle={article} 
                                activeUser={this.props.activeUser}/>    
                                )
                            }
                        </div>
                    </CardBody>
                    <CardBody className="friends__articles">
                            {
                                this.state.friendsArticles.map(article => 
                                <FriendsArticle key={article.id} TheArticle={article} />    
                                )
                            }
                    </CardBody>
                </Card>
            </div>
        )
    }
}
export default withRouter(ArticlesList)