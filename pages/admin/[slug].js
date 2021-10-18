import styles from '../../styles/Admin.module.css';
import AuthCheck from '../../components/AuthCheck';
import { firestore, auth, serverTimestamp } from '../../lib/firebase';
import ImageUploader from '../../components/ImageUploader';

import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import toast from 'react-hot-toast';
import PostFeed from '../../components/PostFeed';
export default function AdminPostEdit({ }) {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
}

// Fetches documents from firestore
// Interacts with documents (delete)
// Where user can toggle between preview and edit modes.
function PostManager() {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query; // Gets document ID

  // AuthCheck confirms our ID
  // Gets path to post from the user ID (auth.currentUser.uid) and 
  // the document ID (slug) to reference the path
  const postRef = firestore.collection('users').doc(auth.currentUser.uid).collection('posts').doc(slug);
  // Using the postRef (path to post doc) we can read/write from/to the doc
  // in real time using the useDocumentData hook from react-firebase-hooks.
  // Or we can use useDocumentDataOnce() hook to only read once and write when we are done.
  const [post] = useDocumentData(postRef);

  return (
    <main className={styles.container}>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>
            {/* Passes in postRef to firestore and default values that can be used in the form */}
            <PostForm postRef={postRef} defaultValues={post} preview={preview} />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button className="btn-blue">Live view</button>
            </Link>
          </aside>
        </>
      )}
    </main>
  );
}

function PostForm({ defaultValues, postRef, preview }) {
  // useForm is a react-hooks component that connects our form to react
  // takes an object with config options are it's argument.
  // defaultValues is the data from the firestore doc.
  // mode: 'onChange' means any time a form value changes it will rerender and revalidate the form.
  const { register, handleSubmit, reset, watch, formState } = useForm({ defaultValues, mode: 'onChange' });

  const { isValid, isDirty, errors } = formState;

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp(),
    });
    reset({content, published});
    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div className="card">
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}
      <div className={preview ? styles.hidden : styles.controls}>

        <ImageUploader />
        
        <textarea name="content" {...register('content', {
          required: {value: true, message: 'content is required'},
          maxLength: {value: 20000, message: 'content is too long'},
          minLength: {value: 10, message: 'content is too short'}
        })}></textarea>

          {errors.content && <p className="text-danger">{errors.content.message}</p>}

        <fieldset>
          <input className={styles.checkbox} name="published" type="checkbox" {...register("published", {required: true})} />
          <label>Published</label>
        </fieldset>
        <button type="submit" className="btn-green" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
      </div>
    </form>
  );
}