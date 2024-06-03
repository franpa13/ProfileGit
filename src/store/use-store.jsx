
import { create } from 'zustand'


const useStore = create((set) => ({
    user: localStorage.getItem("user") || "", 
    setUser: (newValue) => {
        set({ user: newValue }); 
        localStorage.setItem("user", newValue); 
    },

    searchResults: [],
    setSearchResults: (results) => set({ searchResults: results }),

    data: JSON.parse(localStorage.getItem("data")) || "", 
    setData: (data) => {
        set({ data });
        localStorage.setItem("data", JSON.stringify(data)); 
    },
    repo: JSON.parse(localStorage.getItem("repo")) || "", 
    setRepo: (repo) => {
        set({ repo }); 
        localStorage.setItem("repo", JSON.stringify(repo)); 
    },
    languages: JSON.parse(localStorage.getItem("languages")) || "", 
    setLanguages: (languages) => {
        set({ languages }); 
        localStorage.setItem("languages", JSON.stringify(languages)); 
    },
}));

export default useStore;