# Create a SSH key to access the github repo
### On windows kindly install git bash 

Due to github security policy its no longer possible to use HTTP to pull from a private repo follow these steps to crate a SSH key to your profile for access. All data is stored in your system only DO NOT DELETE THESE KEYS.

Please follow these 2 tutorials to add SSH key to your account.

1. [Create SSH KEY](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=windows)
2. [Add SSH key to your profile](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/adding-a-new-ssh-key-to-your-github-account)
3. ``` git clone git@github.com:Rick0038/GDSD-SS2024-Project.git```

# Create a GPG key to sign commits and able to push into the repo
### On windows kindly install git bash 

Due to code security policy kindly add/ create and add your GPG keys to your profile so that all commits can be digitaly verified.

Please follow these 2 tutorials to add GPG key to your account.

1. [Create GPG KEY](https://docs.github.com/en/authentication/managing-commit-signature-verification/generating-a-new-gpg-key)
2. [Add GPG key to your profile](https://docs.github.com/en/authentication/managing-commit-signature-verification/adding-a-gpg-key-to-your-github-account)
3. Set your email as the signing email.\
 ***NOTE*** use the same email which entered at the time of key generation\
 ```git config --global user.email "MY_NAME@example.com"```

4. List your GPG keys using this command and copy the KEY-ID ``` gpg --list-secret-keys ```
5. Go to the current project root and run the following command. This will set the signature key for the current context ```git config user.signingkey YOUR-KEY-ID```
