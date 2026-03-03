const API_URL = "https://api.spaceflightnewsapi.net/v4/blogs/?limit=10";

async function haalSpaceDataOp() {
    const container = document.getElementById('blog-container');

    try {
        const respons = await fetch(API_URL);
        if (!respons.ok) throw new Error("Netwerk respons was niet ok");
        
        const data = await respons.json();
        const blogs = data.results;

        // Maak de container leeg (verwijder de laadtekst)
        container.innerHTML = "";

        // Verwerk elke blog
        blogs.forEach(blog => {
            maakBlogKaart(blog);
        });

        // Log voor de opdracht van BitAcademy
        console.log("Succesvol 10 blogs geladen:", blogs);

    } catch (fout) {
        container.innerHTML = `<p class="error">Oeps! Er is iets misgegaan: ${fout.message}</p>`;
        console.error("Fout bij ophalen data:", fout);
    }
}

function maakBlogKaart(blog) {
    const container = document.getElementById('blog-container');
    
    // HTML structuur voor een blog kaart
    const kaartHTML = `
        <article class="blog-kaart">
            <img src="${blog.image_url}" alt="${blog.title}" class="blog-afbeelding">
            <div class="blog-content">
                <span class="bron">${blog.news_site}</span>
                <h2>${blog.title}</h2>
                <p>${blog.summary.substring(0, 150)}...</p>
                <a href="${blog.url}" target="_blank" class="lees-meer">Lees het volledige artikel</a>
            </div>
        </article>
    `;

    container.innerHTML += kaartHTML;
}

// Start het proces
haalSpaceDataOp();