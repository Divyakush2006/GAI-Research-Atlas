import streamlit as st

from services.atlas_service import AtlasService



st.set_page_config(
    page_title="Research Atlas",
    page_icon="🧭",
    layout="wide"
)

st.markdown("""
<style>

h1 {
    color: #E67E22;
}

h2 {
    color: #E67E22;
}

.stButton > button {
    background-color: #E67E22;
    color: white;
    border-radius: 10px;
    border: none;
    padding: 10px 20px;
    font-weight: bold;
}

.stButton > button:hover {
    background-color: #D35400;
}

.paper-card {
    padding: 15px;
    border-left: 5px solid #E67E22;
    background-color: #FAFAFA;
    border-radius: 10px;
    margin-bottom: 15px;
}

.repo-card {
    padding: 12px;
    border-left: 5px solid #3498DB;
    background-color: #FAFAFA;
    border-radius: 10px;
    margin-bottom: 10px;
}

.resource-card {
    padding: 12px;
    border-left: 5px solid #27AE60;
    background-color: #FAFAFA;
    border-radius: 10px;
    margin-bottom: 10px;
}

</style>
""", unsafe_allow_html=True)

st.markdown("# 🧭 Research Atlas")

st.caption(
    "Semantic discovery of papers, repositories and trusted resources."
)

st.title("Research Atlas")

topic = st.text_input(
    "Enter a research topic",
    value="AI Governance"
)

if st.button("Generate Atlas"):

    with st.spinner("Generating Atlas..."):

        atlas = AtlasService.generate_atlas(
            topic
        )

    st.header("Overview")

    st.write(atlas.overview)


    st.header("Top Papers")

    for paper in atlas.papers:

        st.markdown(
        f"""
        <div class="paper-card">
        <h3>{paper.title}</h3>
        <b>Atlas Score:</b> {paper.score}<br>
        <b>Year:</b> {paper.year}<br>
        <b>Citations:</b> {paper.citation_count}
        </div>
        """,
        unsafe_allow_html=True
        )

    



    st.header("Top Repositories")

    for repo in atlas.repositories:
      st.subheader(repo.name)

      st.write(
        f"Atlas Score: {repo.score}"
    )

      st.write(
        f"Stars: {repo.stars}"
    )

      st.write(
        repo.description
    )

      st.write(
        repo.url
    )
 
    st.header("Trusted Resources")

    for resource in atlas.resources:

        st.write(
            f"**{resource.title}**"
        )

        st.write(resource.url)