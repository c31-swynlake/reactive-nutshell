import React, { Component } from 'react'
import { Card, CardBody } from 'reactstrap';
import TheArticle from './TheArticle'
import ArticleManager from '../../modules/ArticleManager'
import './articles.css'


export default class ArticlesList extends Component {
   
    state = {
        userArticles: [],
        friendsArticles: [],
        friends:[1,2]
    }
    
    componentDidMount() {

        ArticleManager.all()
        .then( allArticlesArray => {
            console.log(this.props.activeUser)
            const userArticles = allArticlesArray.filter(articleElement => articleElement.userId === parseInt(this.props.activeUser))

            const friendsArticles = allArticlesArray.filter(articleElement => this.state.friends.find(friend => parseInt(friend) === articleElement.userId))
            console.log("The current user is: ",this.props.activeUser, "and their articles include: ",userArticles, "and the friends articles are: ", friendsArticles)

            this.setState({
                userArticles: userArticles,
                friendsArticles: friendsArticles
            })
        })
    }
 

    render() {
        return (
            <div>
                <Card>
                    <CardBody>
                        <div className="users__articles">
                            {
                                this.state.userArticles.map(article =>
                                <TheArticle key={article.id} TheArticle={article} />    
                                )
                            }
                        </div>
                    </CardBody>
                    <CardBody className="friends__articles">
                            {
                                this.state.friendsArticles.map(article => 
                                <TheArticle key={article.id} TheArticle={article} />    
                                )
                            }
                    </CardBody>
                </Card>
            </div>
        )
    }
}n