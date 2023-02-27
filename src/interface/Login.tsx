export interface SignInProps {
    handleSignIn?: (username: string, password: string) => void;
    hideTabs?: boolean;
    textFieldVariant?: "outlined" | "filled" | "standard";
    emailValidator?: (value: string) => boolean;
    passwordValidator?: (value: string) => boolean;
}