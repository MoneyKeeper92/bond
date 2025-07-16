// netlify/functions/attempt.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  try {
    const { email, scenario_id, is_correct } = JSON.parse(event.body);

    if (!email || scenario_id === undefined || is_correct === undefined) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields: email, scenario_id, is_correct' }),
      };
    }

    const { error } = await supabase
      .from('attempts')
      .insert({ 
        user_email: email, 
        scenario_id: scenario_id,
        is_correct: is_correct 
      });

    if (error) throw error;

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Attempt logged successfully' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error logging attempt', error: error.message }),
    };
  }
}; 