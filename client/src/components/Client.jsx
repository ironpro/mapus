import React, { Component } from 'react'; 
import axios from "axios" ; 


class Client extends Component {
    state = { 
        clientName : null , 
        clients: []
     }

    componentDidMount = async() => {

        const resp = await axios.get('http://localhost:5000/client/all')  
        const names = resp.data.map(k => k.clientName) ; 
        this.setState({ clients : [...names]  })
        
    }

    handleChange = (e) => {
        e.preventDefault()
        let text = e.target.value;
        this.setState({ clientName: text })
    }

    handleSubmit = async (e) => {
        e.preventDefault() ; 
        console.log(this.state.clientName)

        const resp = await axios.post('http://localhost:5000/client/create', {
            clientName: this.state.clientName 
        })

        const names = resp.data.map(k => k.clientName) ; 
        this.setState({ clients : [...names]  })
    }
    

    render() { 
        return ( 

            <>
                <form className="ml-5 mt-5" onSubmit = { this.handleSubmit }>
                    <label> client :
                    <input className="mt-2 form-control" type = "text" name = "name" onChange= {this.handleChange}/>
                    </label>
                    <button className="ml-3 btn-primary" type = "submit"> Add   </button>
                </form>

                {
                    this.state.clients.length >= 1 && 
                        <ol className="ml-2 mt-5">
                        { 
                            this.state.clients.map((k) => {
                             return <li> { k } </li>
                            }) 
                        }
                        </ol>
                    
                }

            </>

            

         );
    }
}
 
export default Client;

/*

<form className="mt-5 ml-5" onSubmit={this.handleSubmit}>
    <div className="input-group ml-5">
        <label>
            <textarea
                className="form-control"
                ria-label="With textarea"
                onChange={this.handleChange}
            />
        </label>
        <div className="input-group-prepend mb-2 ml-2">
            <input className="input-group-text" type="submit" value="POST" />
        </div>
    </div>
</form>

*/ 