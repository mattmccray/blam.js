
desc "build blam.min.js"
task :build do

  # ASSUMES YOU HAVE UGLIFY-JS INSTALLED, GLOBALLY
  # system("uglifyjs blam.js > blam.min.js")

  require 'packr'
  lines= IO.readlines('blam.js')
  File.open 'blam.min.js', 'w' do |f|
    f.write lines[0]
    f.write Packr.pack( lines.join(''), 
                        :shrink_vars => true, 
                        :base62      => false, 
                        :private     => false)
  end
  puts "Built blam.min.js"

  # system "coffee -c blamc.coffee"
  # lines= IO.readlines('blamc.js')
  # File.open 'blamc.min.js', 'w' do |f|
  #   f.write lines[0]
  #   f.write Packr.pack( lines.join(''), 
  #                       :shrink_vars => true, 
  #                       :base62      => false, 
  #                       :private     => false)
  # end
end

task :default => :build


desc "Run tests"
task :test do
  system("mocha")
end

# No desc cause it's dependent on my local project folders
task :update_doc_dir do
  dev_dir= File.expand_path './'
  doc_dir= File.expand_path '../blam-docs/'
  puts "Moving files from #{ dev_dir } to #{ doc_dir }"
  files= "blam.js blam.min.js ChangeLog.md ReadMe.md".split
  folders= "test bench".split
  files.each do |filename|
    puts " cp #{File.join(dev_dir, filename)} #{File.join(doc_dir, filename)}"
    FileUtils.cp File.join(dev_dir, filename), File.join(doc_dir, filename)
  end
  folders.each do |filename|
    puts " cp -r #{File.join(dev_dir, filename)} #{File.dirname(File.join(doc_dir, filename))}"
    FileUtils.cp_r File.join(dev_dir, filename), File.dirname(File.join(doc_dir, filename))
  end
end
task :update_docsite => :update_doc_dir do
  doc_dir= File.expand_path '../blam-docs/'
  system("cd #{doc_dir} && git ar .")
  system("cd #{doc_dir} && git commit -m 'Update blam.js, the tests and benchmarks.'")
  system("cd #{doc_dir} && git push")
end