interface LoginProps {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TextProps {
    text: string;
}

export type {LoginProps, TextProps}
