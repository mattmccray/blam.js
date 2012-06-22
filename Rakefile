
desc "build blam.min.js"
task :build do

  # ASSUMES YOU HAVE UGLIFY-JS INSTALLED, GLOBALLY

  # require 'packr'
  # lines= IO.readlines('blam.js')
  # File.open 'blam.min.js', 'w' do |f|
  #   f.write lines[0]
  #   f.write Packr.pack( lines.join(''), 
  #                       :shrink_vars => false, 
  #                       :base62      => false, 
  #                       :private     => false)
  # end
  system("uglifyjs blam.js > blam.min.js")
  puts "Built blam.min.js"

  # lines= IO.readlines('kablam.js')
  # File.open 'kablam.min.js', 'w' do |f|
  #   f.write lines[0]
  #   f.write Packr.pack( lines.join(''), 
  #                       :shrink_vars => false, 
  #                       :base62      => false, 
  #                       :private     => false)
  # end
  system("uglifyjs kablam.js > kablam.min.js")
  puts "Built kablam.min.js"
end

task :default => :build