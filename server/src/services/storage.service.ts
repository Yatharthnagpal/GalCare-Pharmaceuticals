import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

const getSupabaseClient = () => {
  if (supabaseClient) return supabaseClient;

  const { SUPABASE_URL, SUPABASE_SERVICE_KEY } = process.env;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
    console.warn('Supabase configuration missing (SUPABASE_URL or SUPABASE_SERVICE_KEY). Storage features will not work.');
    return null;
  }

  supabaseClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  return supabaseClient;
};

export const uploadResume = async (file: Buffer, filename: string): Promise<string> => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn('Supabase not configured, returning mock URL.');
      return `https://mock-storage.galcare.com/resumes/${filename}`;
    }

    const { data, error } = await supabase.storage
      .from('applicant-resumes')
      .upload(filename, file, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (error) {
      console.error('Error uploading resume to Supabase:', error);
      throw error;
    }

    // Generate a signed URL for 1 year
    const { data: signedUrlData, error: signedUrlError } = await supabase.storage
      .from('applicant-resumes')
      .createSignedUrl(data.path, 60 * 60 * 24 * 365);

    if (signedUrlError) {
      console.error('Error creating signed URL:', signedUrlError);
      throw signedUrlError;
    }

    return signedUrlData.signedUrl;
  } catch (error) {
    console.error('uploadResume exception:', error);
    throw new Error('Failed to upload resume');
  }
};

export const uploadPublicImage = async (file: Buffer, filename: string, folder: string): Promise<string> => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn('Supabase not configured, returning mock URL.');
      return `https://mock-storage.galcare.com/${folder}/${filename}`;
    }

    const filePath = `${folder}/${filename}`;

    const { data, error } = await supabase.storage
      .from('public-media')
      .upload(filePath, file, {
        upsert: true,
      });

    if (error) {
      console.error('Error uploading public image to Supabase:', error);
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('public-media')
      .getPublicUrl(data.path);

    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('uploadPublicImage exception:', error);
    throw new Error('Failed to upload image');
  }
};

export const deleteFile = async (bucket: string, path: string): Promise<boolean> => {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn('Supabase not configured, skipping delete.');
      return true;
    }

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      console.error('Error deleting file from Supabase:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('deleteFile exception:', error);
    return false;
  }
};
