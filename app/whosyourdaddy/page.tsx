import { revalidatePath } from 'next/cache';
import Container from './Container';

const BackPage = () => {
  revalidatePath('/whosyourdaddy');
  return <Container />;
};

export default BackPage;
