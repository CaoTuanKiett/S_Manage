import Cookies from 'js-cookie';
const router = useRouter();

export default isLogin = () => {
  const token = Cookies.get('auth_token');
  if (!token) {
      router.push('/home');
  }
};