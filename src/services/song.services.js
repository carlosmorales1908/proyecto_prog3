class SongService{
    constructor(){
        this.baseURL = import.meta.env.VITE_BASE_URL
        this.error = null;
        this.token = import.meta.env.VITE_AUTH_TOKEN;
    } 

    async getAllSongs(){
        try {
            const URI = `${this.baseURL}harmonyhub/songs`
            const rawResponse = await fetch(URI,{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
            },
        });
        
        if(!rawResponse.ok){
            throw new Error("Error getting the songs");
        }

        const response = await rawResponse.json();
        this.error = null;
        return response;
        } catch (error) {
            this.error = error.message || "Unknown error";
            console.error("Error getting the songs: ",this.error)
        }
    }


    async getSongById(id){
        try {
        const URI = `${this.baseURL}harmonyhub/songs/${id}/`;
        const rawResponse = await fetch(URI,{
            method:"GET",
            headers:{
                Accept:"application/json",
                 "Content-Type":"application/json",
                },
            });
            if (!rawResponse.ok){
                throw new Error(`Error getting the song with the ID: ${id}`);
            }
            const response = await rawResponse.json();
            this.error = null;
            return response;
        } catch (error) {
            this.error = error.message || "Unknown error";
            console.error(`Error getting the song with the ID ${id}`, this.error);
        }
    }

    async addSong(data) {
        try {
            const URI = `${this.baseURL}harmonyhub/songs/`;
            const formData = new FormData();
        
            for (const key in data) {
               
                    formData.append(key, data[key] || '');
               
            }
            const rawResponse = await fetch(URI, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    Authorization: `Token ${this.token}`,
                },
                body: formData,
            });
            
            const response = await rawResponse.json();
            console.log('Server Response:', response);
        
            if (!rawResponse.ok) {
                const errorText = await rawResponse.text(); 
                throw new Error(`Error adding the song: ${errorText}`);
            }
        } catch (error) {
            this.error = error.message || "Unknown error";
            console.error("Error adding the song: ", this.error);
        }
    }


    async updateSong(id,data) {
        try {
            const URI = `${this.baseURL}harmonyhub/songs/${id}/`;
            const formData = new FormData();
        
            for (const key in data) {
               
                    formData.append(key, data[key] || '');
               
            }
            const rawResponse = await fetch(URI, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    Authorization: `Token ${this.token}`,
                },
                body: formData,
            });
            

            if (!rawResponse.ok) {
                const errorText = await rawResponse.text(); 
                throw new Error(`Error update the song: ${errorText}`);
            }

            const response = await rawResponse.json();
            console.log('Server Response:', response);
        
           
        } catch (error) {
            this.error = error.message || "Unknown error";
            console.error("Error updating the song: ", this.error);
        }
    }

    async deleteSong(id) {
        try {
            const URI = `${this.baseURL}harmonyhub/songs/${id}/`;
            const rawResponse = await fetch(URI, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Token ${this.jwt}`
                },
            });
            if (!rawResponse.ok) {
                throw new Error(`Error deleting data with ID ${id}`);
            }

            const response = await rawResponse.json();
            this.error = null;
            return response;
        } catch (error) {
            this.error = error.message || "Unknown error";
            console.error(`Error deleting data with ID ${id}: `, this.error);
        }
    }

    getError() {
        return this.error;
    }

    clearError() {
        this.error = null;
    }
}

export default SongService;
