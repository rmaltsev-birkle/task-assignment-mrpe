select
  cr.id,
  cr.version,
  cr.content
from
  content_revisions as cr
  inner join (
    select
      id,
      max(version) as version
    from
      content_revisions
    group by
      id
  ) as latest_versions on latest_versions.id = cr.id
  and latest_versions.version = cr.version
order by
  id asc;