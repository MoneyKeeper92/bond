// scripts/query.js
const { createClient } = require('@supabase/supabase-js');

// Read credentials from command-line arguments
const supabaseUrl = process.argv[2];
const supabaseKey = process.argv[3];

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Please provide SUPABASE_URL and SUPABASE_SERVICE_KEY as command-line arguments.');
  console.error('Usage: node scripts/query.js <SUPABASE_URL> <SUPABASE_SERVICE_KEY>');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getStudentAnalytics() {
  console.log('Fetching Student Performance Data...');
  const { data, error } = await supabase.rpc('get_student_performance');

  if (error) {
    console.error('Error fetching student analytics:', error);
    return;
  }
  
  console.log('--- Student Performance ---');
  console.table(data);
}

async function getScenarioAnalytics() {
  console.log('\nFetching Scenario Difficulty Data...');
  const { data, error } = await supabase.rpc('get_scenario_difficulty');

  if (error) {
    console.error('Error fetching scenario analytics:', error);
    return;
  }
  
  console.log('--- Scenario Difficulty ---');
  console.table(data);
}

async function main() {
  await getStudentAnalytics();
  await getScenarioAnalytics();
}

main().catch(console.error); 