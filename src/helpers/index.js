export const API_URL =
  "https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data";


  export const validate = ({ name, email }) => {
    const errors = {};
  
    if (!name) {
      errors.name = "Name is required";
    }
  
    if (!email) {
      errors.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "Invalid email address";
    }
  
    return errors;
  };
  