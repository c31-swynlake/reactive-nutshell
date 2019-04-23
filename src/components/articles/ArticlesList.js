import React, { Component } from 'react'
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle
} from 'reactstrap';
import TheArticle from './TheArticle'
import FriendsArticle from './FriendArticles'




export default class ArticlesList extends Component {
    // userId = sessionStorage.getItem("credentials.userId")
    // userId = 1;

    // state = {
    //     articles: [],
    //     friends: []
    // }
    
    // componentDidMount() {
    //     const theNewState = {}

        
    // }
    friends = userId => {
        let friends = this.props.friends.filter(theFriend => theFriend.currentUserId === userId)

        friends.forEach(friend => {
            this.props.articles.filter(theArticle => theArticle.userId === friend.id)
            .map(friendArticle =>
                <div key={friendArticle.id}>
                    {friendArticle.title}
                </div>    
            )
        });
    }

    render() {
        const userId = 1;

        return (
            <div>
                <Card>
                    <CardBody>
                        {
                            this.props.articles
                            .filter(theArticle => theArticle.userId === userId)
                            .map(theArticle => 
                                <TheArticle TheArticle={theArticle}/>
                            )
                        }
                    </CardBody>
                    <CardBody>
                        <FriendsArticle theFriends={friends} friends={this.props.friends} articles={this.props.articles}/>
                    </CardBody>
                </Card>
            </div>
        )
    }
}