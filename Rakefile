
desc "build blam.min.js"
task :build do
  require 'packr'
  lines= IO.readlines('blam.js')
  File.open 'blam.min.js', 'w' do |f|
    f.write lines[0]
    f.write Packr.pack( lines.join(''), 
                        :shrink_vars => false, 
                        :base62      => false, 
                        :private     => false)
  end
  puts "Built blam.min.js"
end

task :default => :build