require 'rubygems'
require "bundler/setup"
require 'gumdrop'

# For the update task
BRANCH= "master"
TO_COPY= [
  'blam.js',
  'blam.min.js',
  'ChangeLog.md',
  'License',
  'README.md',
  'bench',
  'test'
]

desc "Build source files into output_dir"
task :build do
  system("bundle exec gumdrop -b")
end

desc "Run development server"
task :serve do
  system("bundle exec gumdrop -s")
end

desc "Watches files for changes and recompiles site"
task :watch do
  require "filesystemwatcher"
  watcher = FileSystemWatcher.new()
  watcher.addDirectory( File.expand_path("./_source"), "*")
  watcher.sleepTime = 10
  watcher.start { |status,file|
      system("bundle exec gumdrop -b")
  }
  watcher.join() # join to the thread to keep the program alive
end

desc "Outputs the Gumdrop version"
task :version do
  puts Gumdrop::VERSION
end

task :default do
  puts `rake -T`
end

desc "Pull files from #{ BRANCH } branch"
task :update do
  require 'tmpdir'
  require 'fileutils'
  dir= File.join Dir.tmpdir, "-#{ BRANCH }-files"
  here= File.expand_path('.')
  FileUtils.mkdir dir
  
  puts "Exporting #{ BRANCH } to #{ dir }"
  system "git archive #{ BRANCH } | tar -x -C #{ dir }"

  TO_COPY.each do |path|
    FileUtils.rm_rf File.join(here, path), :verbose=>true
    FileUtils.cp_r File.join(dir,path), File.join(here, path), :verbose=>true
  end

  #system "cd #{dir} && git clone #{here} __source-files"
  system "open #{ dir }"

  puts "Removing #{ dir }"
  FileUtils.rm_rf dir

  puts "Done."
end