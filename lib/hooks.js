import { useDispatch, useSelector } from "react-redux";
import { addArticlesToStore, deleteArticleToStore } from '../reducers/bookmarks';
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Login } from "../reducers/user";

export function useBookmark(props) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.value)

    const handleClick = () => {
        if (!user.token) {
            toast.error("You need to be connected to bookmark an article");
            return;
        }
        fetch(`http://localhost:3000/users/canBookmarks/${user.token}`)
            .then(res => res.json())
            .then(data => {
                if (data.result && data.canBookmarks) {
                    if (props.isBookmarked) {
                        dispatch(deleteArticleToStore(props.title))
                    } else {
                        dispatch(addArticlesToStore(props))
                    }
                } else {
                    toast.error("You are not allowed to bookmark an article")
                }
            })
    }

    let color;
    if (props.isBookmarked) {
        color = {
            color: "aqua"
        }
    }

    return { handleClick, color };
}

export function useFetchArticles() {
    const [topArticle, setTopArticle] = useState([]);
    const [articlesData, setArticlesData] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/articles`)
            .then((res) => res.json())
            .then((ArticleData) => {
                setTopArticle(ArticleData.articles[0])
                setArticlesData(ArticleData.articles.slice(1))
            });
    }, []);


    return { topArticle, articlesData };
}

export function useLogin() {
    const dispatch = useDispatch()
    const [usernameUp, setUsernameUp] = useState("")
    const [passwordUp, setPasswordUp] = useState("")

    function handleClickUp() {
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!passwordRegex.test(passwordUp)) {
            toast.error(
                "Password must contain 8 characters, 1 uppercase, 1 number and 1 special character"
            );
            return;
        }
        fetch(`http://localhost:3000/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: usernameUp, // req.body.username
                password: passwordUp  // req.body.password
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.result) {
                    dispatch(Login({ token: data.token, username: usernameUp }))
                    setUsernameUp("");
                    setPasswordUp("");
                    toast.success("Account created successfully ");
                }
            });
    }

    return {
        usernameUp,
        passwordUp,
        setPasswordUp,
        setUsernameUp,
        handleClickUp
    };
}

export function useLogout() {
    const dispatch = useDispatch()
    const [usernameIn, setUsernameIn] = useState("")
    const [passwordIn, setPasswordIn] = useState("")

    function handleClickIn() {
        fetch(`http://localhost:3000/users/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: usernameIn, // req.body.username
                password: passwordIn  // req.body.password
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.result) {
                    dispatch(Login({ token: data.token, username: usernameIn }))
                    toast.success("You are connected successfully");
                    setUsernameIn("");
                    setPasswordIn("");
                } else {
                    toast.error("Account not found")
                }
            });
    }

    return {
        usernameIn,
        passwordIn,
        setUsernameIn,
        setPasswordIn,
        handleClickIn
    }
}