
desc "build blam.min.js"
task :build do

  # ASSUMES YOU HAVE UGLIFY-JS INSTALLED, GLOBALLY
  # system("uglifyjs blam.js > blam.min.js")
  # puts "Built blam.min.js"

  require 'packr'
  lines= IO.readlines('blam.js')
  File.open 'blam.min.js', 'w' do |f|
    f.write lines[0]
    f.write Packr.pack( lines.join(''), 
                        :shrink_vars => true, 
                        :base62      => false, 
                        :private     => false)
  end

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