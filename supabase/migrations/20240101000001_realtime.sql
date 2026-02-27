begin;
  -- remove the supabase_realtime publication if it already exists
  drop publication if exists supabase_realtime;

  -- re-create the supabase_realtime publication with no tables
  create publication supabase_realtime;
commit;

-- add tables to the publication
alter publication supabase_realtime add table public.conversations;
alter publication supabase_realtime add table public.agents;
alter publication supabase_realtime add table public.workflow_runs;
