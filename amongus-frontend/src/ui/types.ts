interface LoginProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TextProps {
    text: string;
}

interface User {
    username: string;
    password: string
}

export type {LoginProps, TextProps, User}
