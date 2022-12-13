import { useState, useEffect } from 'react';

function Form(){

    // useEffect(()=>{

    // });

    const[user, setUser] = useState({
        Name: '',
        Email: '',
        Phone: '',
        phoneType: '',
        Staff: '',
        Bio: '',
        Notification: true//checked ? checked : ''
    });

    const[errors, setErrors] = useState([]);

    const handleChange = (incomingKey) => {
        return e => {
          const newObj = {...user, [incomingKey]: e.target.value}
          setUser(newObj);
        }
    }

    const validate = ()=>{
        let errors = [];
        if(!user.Name){
          errors.push("Please enter your name")
        }

        if(!user.Email.includes('@')){
            errors.push('Please provide a valid Email')
        }

        if(user.Phone.length < 11){
          errors.push('Please enter valid phone number (11 digits)')
        }

        if(!user.Phone){
            errors.push('Please enter valid phone type')
        }

        if(user.Bio.length > 280 )
            errors.push('The limit of Bio is 280 characters')

        return errors;
      }

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(user);

        let errors = validate();


        if(errors.length){
          setErrors(errors)
        } else {
          //submitting to backend;

          //clear form
          setUser({
            Name: '',
            Email: '',
            Phone: '',
            phoneType: '',
            Staff: '',
            Bio: '',
            Notification: ''
        });
          //clear the errors
          setErrors([]);
        }}

    const showErrors = () => {
            if(!errors.length) return null;
            return(
              <ul>
                {errors.map((error, i)=> <li key={i}>{error}</li>)}
              </ul>
            )
          }

    return (
        <>
            <form onSubmit={ handleSubmit }>

                <div>
                    <label htmlFor="Name">Name:</label>
                    <input type="text" id='Name' value={user.Name} onChange={handleChange('Name')}/>
                </div>

                <div>
                    <label htmlFor="Email">Email:</label>
                    <input type="text" id='Email' value={user.Email} onChange={handleChange('Email')} />
                </div>

                <div>
                    <label htmlFor="Phone">Phone number:</label>
                    <input type="text" id='Phone' value={user.Phone} onChange={handleChange('Phone')}/>

                    <select name="phoneType" value={user.phoneType} onChange={handleChange('phoneType')}>
                        <option value="" disabled>
                            Select a phone type...
                        </option>
                        <option>Home</option>
                        <option>Work</option>
                        <option>Mobile</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="Staff">Staff:</label>
                    <br/>
                    <input type="radio" name="Staff" value="Instructor" id="Staff" onChange={handleChange('Staff')}/> Instructor
                    <input type="radio" name="Staff" value="Student" id="Staff" onChange={handleChange('Staff')}/> Student
                    {/* hard code value for checkbox and radio */}
                </div>

                <div>
                    <label htmlFor="Bio">Bio:</label>
                    <textarea name="Bio" id="Bio" value={user.Bio} onChange={handleChange('Bio')}></textarea>
                </div>

                <div>
                    <label htmlFor="Notification">Sign up for email notifications</label>
                    <input type="checkbox" id="Notification" checked={user.Notification} onChange={(e) => setUser(user=> ({...user, Notification: !user.Notification}))}/>
                </div>

                <button>Submit</button>
                {showErrors()}
            </form>
        </>
    )
};

export default Form;
