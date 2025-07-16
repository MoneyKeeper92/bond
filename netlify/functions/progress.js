// netlify/functions/progress.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  const { email } = event.queryStringParameters;

  if (!email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Email is required' }),
    };
  }

  // Handle POST requests to save/update progress
  if (event.httpMethod === 'POST') {
    try {
      const { completedScenarios, currentId } = JSON.parse(event.body);
      
      const { error } = await supabase
        .from('progress')
        .upsert({ 
          user_email: email, 
          completed_scenarios: completedScenarios,
          current_id: currentId 
        }, {
          onConflict: 'user_email'
        });

      if (error) throw error;

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Progress saved successfully' }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error saving progress', error: error.message }),
      };
    }
  }

  // Handle GET requests to load progress
  if (event.httpMethod === 'GET') {
    try {
      const { data, error } = await supabase
        .from('progress')
        .select('completed_scenarios, current_id')
        .eq('user_email', email)
        .single();

      if (error && error.code !== 'PGRST116') { // Ignore "no rows found" error
        throw error;
      }
      
      if (data) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            completedScenarios: data.completed_scenarios,
            currentId: data.current_id
          }),
        };
      } else {
        // If no progress found, return default starting state
        return {
          statusCode: 200,
          body: JSON.stringify({
            completedScenarios: {},
            currentId: 1
          }),
        };
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: 'Error loading progress', error: error.message }),
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ message: 'Method Not Allowed' }),
  };
}; 