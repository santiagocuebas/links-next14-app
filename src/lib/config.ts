export const DIR = process.env.NEXT_PUBLIC_DIR;

export const GOOGLE_URI = 'https://accounts.google.com/o/oauth2/auth?scope=openid%20email&response_type=code&access_type=offline&client_id=' + process.env.NEXT_PUBLIC_GOOGLE_ID;

export const GITHUB_URI = 'https://github.com/login/oauth/authorize?client_id=' +
  process.env.NEXT_PUBLIC_GITHUB_ID + '&scope=read:user,user:email';
