require 'pp'

guard :shell do
  
  watch(/.*_source.*/) do |m|
    puts "Changed files:"
    pp m
    puts "Recompiling site"
    `bundle exec gumdrop --build`
  end

end
