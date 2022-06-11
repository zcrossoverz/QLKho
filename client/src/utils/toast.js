import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const succesToast = (msg) => toast.success(msg, { theme:'dark' });

export const errorToast = (msg) => toast.error(msg, { theme:'dark' });