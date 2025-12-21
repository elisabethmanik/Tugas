import streamlit as st
from PIL import Image, ImageEnhance, ImageOps
import io

def main():
    st.title("Informatika_Streamlit")
    st.sidebar.write("##Upload Image")
    uploaded_file = st.sidebar.file_uploader("", type=["jpg", "png", "jpeg"])

    if uploaded_file is not None:
        image = Image.open(uploaded_file)
        st.sidebar.image(image, caption="Gambar", use_container_width=True)
        
        contrast_value = st.sidebar.slider("Contrast", 1.0, 3.0, 1.0, step=0.1)
        edited_image = ImageEnhance.Contrast(image).enhance(contrast_value)

        if st.sidebar.checkbox("Grayscale"):
            edited_image = ImageEnhance.Contrast(edited_image)

        st.image(edited_image, caption="Hasil Edit", use_container_width=True)

        #download
        buf = io.BytesIO()
        edited_image.save(buf, format="JPEG")
        buf.seek(0)
        st.download_button("Download", buf, file_name="edited_image.jpg", mime="image/jpeg")

if __name__=="__main__":
    main()