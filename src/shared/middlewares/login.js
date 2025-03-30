export default async (to, from) => {
	const token = localStorage.getItem('token');
  
	if (token) {
	  return { name: 'calls' };
	}
  
	return true;
  };
  