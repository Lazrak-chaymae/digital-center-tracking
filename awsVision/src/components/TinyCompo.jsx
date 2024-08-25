import React, { useState } from 'react'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { EditOutlined } from "@ant-design/icons";
import { Button } from 'antd';

const TinyCompo = ({id, value, fonction, admin}) => {
    const editorRef = useRef(null);
    const firstComment = value;
    const [isUpdate, setIsUpdate] = useState(false);
  
    const log = () => {
      if (editorRef.current) {
        const content = editorRef.current.getContent();
        console.log("id is:", id);
        console.log("value is:", value);
        console.log(content);
        handleUpdate(id, content);
        setIsUpdate(false);
      }
    };
    
    const handleUpdate = async( id, value) => {
        
      try {
     
        const response = await fonction(id, value);
        console.log(response.data);
      } catch (error) {
        console.error('Error updating :', error);
      }
    }
  return (
    <>
      {!isUpdate ?  
      
      (<div>
        <p dangerouslySetInnerHTML={{ __html: firstComment }}></p>
        {admin &&  <EditOutlined onClick={() => setIsUpdate(true)} /> }
       
      </div>): 
      ( <div>
        <Editor
        apiKey='kdhwqgh25qbqggclsoxjmubwc1gqxroxt1bbfyquw8d7anz5'
        onInit={(_evt, editor) => editorRef.current = editor}
        initialValue={firstComment}
        init={{
          height: 150,
          width:200,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <Button onClick={log}>Submit</Button>
      </div>
      )
      }
      
      
    </>
  )
}

export default TinyCompo